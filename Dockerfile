# ---- Builder ----
FROM node:23-slim AS builder

# Enable pnpm via Corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory
WORKDIR /app

# Copy only dependency files first for better caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the app
COPY . .

# Build the app
RUN pnpm build

# ---- Runner ----
FROM node:23-slim AS runner

# Install curl and Chromium for Puppeteer
RUN apt-get update && \
    apt-get install -y curl chromium && \
    rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

# Enable pnpm via Corepack (for running, not building)
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app

# Only copy the necessary files for running the app
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["pnpm", "start"] 