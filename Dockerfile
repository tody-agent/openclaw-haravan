FROM node:22-bookworm

# 1. Install system dependencies
RUN apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    ca-certificates curl git gosu procps python3 build-essential zip \
  && rm -rf /var/lib/apt/lists/*

# 2. Setup the Railway UI environment (from railway-runtime)
WORKDIR /app
COPY railway-runtime/package.json railway-runtime/pnpm-lock.yaml ./
RUN corepack enable && pnpm install --frozen-lockfile --prod
COPY railway-runtime/src ./src

# 3. Copy our entrypoint script
# We will use the root entrypoint.sh we create.
COPY --chmod=755 entrypoint.sh ./entrypoint.sh

# 4. Install OpenClaw globally
RUN npm install -g openclaw@2026.4.2 clawhub@latest

# 5. Build our Monorepo and link the Haravan Ops Plugin
# First, create a work directory inside /app for our monorepo
WORKDIR /app/monorepo
COPY . .
# Build the monorepo
RUN npm install && npm run build
# Register the local plugin. Since OPENCLAW_STATE_DIR is not set globally, it installs to default path.
RUN openclaw plugins install -l /app/monorepo/packages/openclaw-haravan-plugin

# 6. Revert working dir for Railway runtime and set protections
WORKDIR /app
RUN useradd -m -s /bin/bash openclaw \
  && chown -R openclaw:openclaw /app \
  && mkdir -p /data && chown openclaw:openclaw /data \
  && mkdir -p /home/linuxbrew/.linuxbrew && chown -R openclaw:openclaw /home/linuxbrew

# Switch user and install Homebrew
USER openclaw
RUN NONINTERACTIVE=1 /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

ENV PATH="/home/linuxbrew/.linuxbrew/bin:/home/linuxbrew/.linuxbrew/sbin:${PATH}"
ENV HOMEBREW_PREFIX="/home/linuxbrew/.linuxbrew"
ENV HOMEBREW_CELLAR="/home/linuxbrew/.linuxbrew/Cellar"
ENV HOMEBREW_REPOSITORY="/home/linuxbrew/.linuxbrew/Homebrew"

ENV PORT=8080
ENV OPENCLAW_ENTRY=/usr/local/lib/node_modules/openclaw/dist/entry.js
EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD curl -f http://localhost:8080/setup/healthz || exit 1

# Notice: plugin is linked again inside entrypoint.sh to survive Persistent Volume mounts on /data

USER root
ENTRYPOINT ["./entrypoint.sh"]
