FROM node:18-alpine

# Install curl
RUN apk add --no-cache curl

# Enable pnpm via Corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy only dependency files first for better caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the app
COPY . .

# Build the app
RUN pnpm build

EXPOSE 3000

CMD ["pnpm", "start"] 