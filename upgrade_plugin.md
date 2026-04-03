
# TÀI LIỆU HƯỚNG DẪN: Tạo & Đưa Plugin Lên OpenClaw Community

## 1. TẠI SAO NÊN CHUYỂN TỪ SKILL SANG PLUGIN?

| | Skill | Plugin |
|---|---|---|
| **Bảo mật** | File markdown thuần, chạy qua LLM, không cách ly | Chạy in-process, có config schema validation, hỗ trợ `sensitive` fields, deny/allow list |
| **Kiểm soát** | LLM tự diễn giải, khó kiểm soát hành vi | Code TypeScript cố định, hành vi xác định |
| **Cấu hình** | Không có hệ thống config chuẩn | JSON Schema validation, UI hints, per-plugin config |
| **Phân phối** | ClawHub skills hoặc copy file | ClawHub packages hoặc npm, `openclaw plugins install` |
| **Hook & Lifecycle** | Không có | `before_tool_call`, `before_install`, `message_sending`... |

---

## 2. CẤU TRÚC MỘT PLUGIN HOÀN CHỈNH

```
my-openclaw-plugin/
├── package.json                  # npm metadata + openclaw block
├── openclaw.plugin.json          # Manifest (BẮT BUỘC)
├── index.ts                      # Entry point chính
├── src/
│   ├── tools/                    # Các tool bạn đăng ký
│   │   ├── tool-a.ts
│   │   └── tool-b.ts
│   └── utils.ts
├── README.md                     # Tài liệu hướng dẫn sử dụng
└── tsconfig.json
```

---

## 3. TỪNG BƯỚC TẠO PLUGIN

### Bước 1: Khởi tạo project

```bash
mkdir my-openclaw-plugin && cd my-openclaw-plugin
npm init -y
# Chuyển sang ESM
```

### Bước 2: Tạo `package.json` với metadata OpenClaw

```json
{
  "name": "@yourorg/openclaw-my-plugin",
  "version": "1.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "openclaw": {
    "extensions": ["./dist/index.js"],
    "compat": {
      "pluginApi": ">=2026.3.24-beta.2",
      "minGatewayVersion": "2026.3.24-beta.2"
    },
    "build": {
      "openclawVersion": "2026.3.24-beta.2",
      "pluginSdkVersion": "2026.3.24-beta.2"
    }
  }
}
```

> **Lưu ý quan trọng:** Cập nhật `compat` và `build` theo version OpenClaw mới nhất tại thời điểm bạn publish.

### Bước 3: Tạo `openclaw.plugin.json` (Manifest — BẮT BUỘC)

```json
{
  "id": "my-plugin",
  "name": "My Awesome Plugin",
  "description": "Mô tả ngắn về plugin của bạn",
  "version": "1.0.0",
  "contracts": {
    "tools": ["my_tool_a", "my_tool_b"]
  },
  "configSchema": {
    "type": "object",
    "additionalProperties": false,
    "properties": {
      "apiKey": {
        "type": "string"
      },
      "baseUrl": {
        "type": "string"
      }
    }
  },
  "uiHints": {
    "apiKey": {
      "label": "API Key",
      "placeholder": "sk-...",
      "sensitive": true
    }
  }
}
```

Giải thích các trường quan trọng:

- **`id`** (bắt buộc): ID duy nhất, dùng trong `plugins.entries.<id>`.
- **`configSchema`** (bắt buộc): JSON Schema cho config, kể cả không có config cũng phải khai báo schema rỗng.
- **`contracts.tools`**: Khai báo tĩnh các tool mà plugin sở hữu.
- **`uiHints`**: Gợi ý cho UI, đặc biệt `sensitive: true` sẽ ẩn giá trị (giải quyết vấn đề bảo mật mà skill không làm được).

### Bước 4: Viết code entry point `index.ts`

```typescript
import { definePluginEntry } from "openclaw/plugin-sdk/plugin-entry";
import { Type } from "@sinclair/typebox"; // hoặc dùng JSON Schema thuần

export default definePluginEntry({
  id: "my-plugin",
  name: "My Awesome Plugin",

  register(api) {
    // Đọc config bảo mật từ plugin config
    const { apiKey, baseUrl } = api.pluginConfig as {
      apiKey?: string;
      baseUrl?: string;
    };

    // Tool A - luôn có sẵn (required)
    api.registerTool({
      name: "my_tool_a",
      description: "Mô tả tool A làm gì cho LLM hiểu",
      parameters: Type.Object({
        query: Type.String({ description: "Search query" }),
        limit: Type.Optional(Type.Number({ description: "Max results" })),
      }),
      async execute(_id, params) {
        // Logic xử lý của bạn
        const result = await doSomething(params.query, apiKey);
        return {
          content: [{ type: "text", text: JSON.stringify(result) }],
        };
      },
    });

    // Tool B - optional, user phải bật
    api.registerTool(
      {
        name: "my_tool_b",
        description: "Tool có side-effect, cần user cho phép",
        parameters: Type.Object({
          action: Type.String(),
        }),
        async execute(_id, params) {
          const result = await doAction(params.action, apiKey);
          return {
            content: [{ type: "text", text: result }],
          };
        },
      },
      { optional: true }
    );

    // Hook lifecycle (tuỳ chọn)
    api.on("before_tool_call", async (event) => {
      api.logger.info(`Tool call: ${event.toolName}`);
      return {}; // không block
    });

    api.logger.info("My Plugin loaded successfully!");
  },
});
```

**Quy tắc import quan trọng:** Luôn import từ subpath cụ thể:
```typescript
// ĐÚng:
import { definePluginEntry } from "openclaw/plugin-sdk/plugin-entry";
import { createPluginRuntimeStore } from "openclaw/plugin-sdk/runtime-store";

// SAI (deprecated, sẽ bị xoá):
import { ... } from "openclaw/plugin-sdk";
```

### Bước 5: Build và test local

```bash
# Build TypeScript
npx tsc

# Test bằng cách load local
openclaw plugins install -l ./path/to/my-plugin   # link, không copy

# Kiểm tra
openclaw plugins list
openclaw plugins inspect my-plugin
openclaw plugins doctor    # chạy diagnostics
```

---

## 4. PUBLISH LÊN CLAWHUB HOẶC NPM

### Cách A: Publish lên ClawHub (khuyến nghị — OpenClaw ưu tiên tìm ở đây trước)

```bash
# Cài ClawHub CLI
npm i -g clawhub

# Đăng nhập
clawhub login

# Dry-run trước
clawhub package publish ./my-openclaw-plugin --dry-run

# Publish thật
clawhub package publish ./my-openclaw-plugin
```

Nếu code ở GitHub:
```bash
clawhub package publish your-username/my-openclaw-plugin
clawhub package publish your-username/my-openclaw-plugin@v1.0.0
```

### Cách B: Publish lên npm

```bash
npm login
npm publish --access public
```

Sau khi publish, user cài bằng:
```bash
openclaw plugins install my-openclaw-plugin
# hoặc
openclaw plugins install clawhub:my-openclaw-plugin
```

---

## 5. ĐĂNG KÝ VÀO DANH SÁCH COMMUNITY PLUGINS

Đây là bước để plugin của bạn xuất hiện trên trang [Community Plugins](https://docs.openclaw.ai/plugins/community) chính thức.

### Quy trình 3 bước:

**Bước 1:** Publish plugin lên ClawHub hoặc npm (đã làm ở phần 4).

**Bước 2:** Đảm bảo có public GitHub repo với documentation đầy đủ.

**Bước 3:** Mở Pull Request vào repo `openclaw/openclaw` để thêm plugin vào danh sách community.

### Yêu cầu chất lượng (Quality Bar):

| Yêu cầu | Lý do |
|---|---|
| **Đã publish trên ClawHub hoặc npm** | User cần `openclaw plugins install` hoạt động được |
| **Public GitHub repo** | Cho phép review source code, theo dõi issue, minh bạch |
| **Có tài liệu setup và usage** | User cần biết cách cấu hình |
| **Bảo trì tích cực** | Có update gần đây hoặc phản hồi issue kịp thời |

> **Cảnh báo:** "Low-effort wrappers, unclear ownership, or unmaintained packages may be declined" — Plugin wrapper đơn giản, không rõ chủ sở hữu, hoặc không bảo trì sẽ bị từ chối.

---

## 6. VỀ THỜI GIAN DUYỆT & CÂU HỎI CỦA BẠN

### Thời gian duyệt là bao lâu?

Tài liệu OpenClaw **không công bố thời gian duyệt cụ thể** cho community plugin listing PR. Dựa trên quan sát:

- **Publish lên ClawHub/npm**: **Tức thì** — không cần duyệt. Ngay sau khi publish, bất kỳ ai cũng có thể `openclaw plugins install <tên-package>` để cài.
- **Được liệt kê trên trang Community Plugins chính thức**: Cần maintainer review PR. Thời gian phụ thuộc vào độ bận của maintainer team và chất lượng PR. Thông thường các open-source project kiểu này review PR trong khoảng **vài ngày đến 1-2 tuần**.

### Trong 8 giờ có kịp lên không?

**Có và Không — tuỳ bạn muốn gì:**

- **CÓ kịp** nếu mục tiêu là **plugin hoạt động và cài được**: Bạn hoàn toàn có thể trong 8h viết code → build → publish lên ClawHub/npm. Lúc đó bất kỳ ai cũng cài được bằng `openclaw plugins install <tên>`. Plugin đã hoạt động đầy đủ.

- **KHÔNG kịp** nếu mục tiêu là **xuất hiện trên trang Community Plugins chính thức**: Vì cần PR review bởi maintainer, và bạn không kiểm soát được thời gian họ review.

### Chiến lược thực tế cho bạn:

1. **Giờ 1-4:** Viết code plugin, tạo manifest, test local.
2. **Giờ 4-5:** Tạo GitHub repo public, viết README.
3. **Giờ 5-6:** Publish lên ClawHub + npm.
4. **Giờ 6-7:** Mở PR vào `openclaw/openclaw` để xin vào danh sách community.
5. **Giờ 7-8:** Chia sẻ link ClawHub/npm trên Discord OpenClaw, Reddit... để mọi người dùng ngay trong khi chờ PR được merge.

---

## 7. CHECKLIST TRƯỚC KHI SUBMIT

```
☐ openclaw.plugin.json có đầy đủ id + configSchema
☐ package.json có block "openclaw" với extensions, compat, build
☐ Code import từ subpath cụ thể (không dùng monolithic root)
☐ Tool names không trùng với core tools
☐ Tools có side-effect đánh dấu { optional: true }
☐ Sensitive config fields có uiHints.sensitive = true
☐ Build thành công (TypeScript → JS)
☐ openclaw plugins doctor chạy không lỗi
☐ Test local với openclaw plugins install -l <path>
☐ GitHub repo public + README đầy đủ
☐ Publish thành công lên ClawHub hoặc npm
☐ Mở PR vào openclaw/openclaw (cho community listing)
```

---

## 8. SO SÁNH NHANH: SKILL CỦ VS PLUGIN MỚI CỦA BẠN

Ví dụ bạn có skill gọi API bên ngoài:

**Skill cũ (SKILL.md):**
```markdown
# API Caller Skill
Khi user yêu cầu gọi API, dùng exec tool với curl...
API_KEY=sk-xxx-hardcoded-trong-file
```
→ API key lộ trong file text, LLM có thể hiểu sai, không validate input.

**Plugin mới:**
```typescript
// API key nằm trong config bảo mật
const apiKey = api.pluginConfig.apiKey; // từ plugins.entries.my-plugin.config

// Tool có schema validation
api.registerTool({
  name: "call_api",
  parameters: Type.Object({
    endpoint: Type.String(),
    method: Type.Union([Type.Literal("GET"), Type.Literal("POST")]),
  }),
  async execute(_id, params) { /* logic cố định, an toàn */ }
});
```
→ API key bảo mật qua config system, input được validate, hành vi deterministic.

---

Tóm lại: **8 giờ dư sức để có plugin hoạt động và ai cũng cài được qua ClawHub/npm.** Việc lên trang community listing chính thức thì cần thêm thời gian chờ maintainer review PR, nhưng đó chỉ là "danh hiệu" — plugin của bạn đã dùng được ngay sau khi publish. Bạn muốn tôi đi sâu hơn vào phần nào không?