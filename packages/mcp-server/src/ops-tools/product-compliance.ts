import type { Haravan } from "@haravan-master/core";

export interface ProductComplianceArgs {
  product_pages?: number;
  limit_per_page?: number;
}

export async function runProductComplianceScan(haravan: Haravan, args: ProductComplianceArgs) {
  const pages = Math.min(Math.max(args.product_pages ?? 3, 1), 15);
  const limit = Math.min(Math.max(args.limit_per_page ?? 80, 1), 250);

  const issues: Array<{
    product_id: number;
    title: string;
    kind: string;
    detail: string;
  }> = [];

  const skuIndex = new Map<string, number[]>();

  for (let page = 1; page <= pages; page++) {
    const products = await haravan.products.list({ limit, page });
    if (products.length === 0) break;

    for (const p of products) {
      const html = (p.body_html ?? "").replace(/<[^>]+>/g, "").trim();
      if (html.length < 50) {
        issues.push({
          product_id: p.id,
          title: p.title,
          kind: "thin_description",
          detail: `Mô tả rút gọn < 50 ký tự (${html.length})`,
        });
      }
      if (!p.images?.length) {
        issues.push({
          product_id: p.id,
          title: p.title,
          kind: "no_images",
          detail: "Không có ảnh",
        });
      }
      if (!(p.vendor ?? "").trim()) {
        issues.push({
          product_id: p.id,
          title: p.title,
          kind: "missing_vendor",
          detail: "Thiếu vendor",
        });
      }
      if (!(p.product_type ?? "").trim()) {
        issues.push({
          product_id: p.id,
          title: p.title,
          kind: "missing_product_type",
          detail: "Thiếu product_type",
        });
      }
      for (const v of p.variants) {
        const sku = (v.sku ?? "").trim();
        if (!sku) {
          issues.push({
            product_id: p.id,
            title: p.title,
            kind: "variant_no_sku",
            detail: `Variant "${v.title}" không có SKU`,
          });
        } else {
          const arr = skuIndex.get(sku) ?? [];
          arr.push(p.id);
          skuIndex.set(sku, arr);
        }
      }
    }
  }

  for (const [sku, ids] of skuIndex) {
    const uniq = [...new Set(ids)];
    if (uniq.length > 1) {
      issues.push({
        product_id: uniq[0],
        title: sku,
        kind: "duplicate_sku",
        detail: `SKU trùng trên product_ids: ${uniq.join(",")}`,
      });
    }
  }

  const byKind = issues.reduce<Record<string, number>>((acc, i) => {
    acc[i.kind] = (acc[i.kind] ?? 0) + 1;
    return acc;
  }, {});

  return {
    summary: {
      total_issue_rows: issues.length,
      by_kind: byKind,
    },
    issues: issues.slice(0, 120),
  };
}
