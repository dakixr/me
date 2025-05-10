# syntax=docker/dockerfile:1.4

FROM node:18-alpine

# Install Chromium, fonts, and curl
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      curl

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser \
    NODE_ENV=production

# Enable pnpm via Corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

COPY . .
RUN pnpm build

# Drop to non-root
USER node

EXPOSE 3000
CMD ["pnpm", "start"] 