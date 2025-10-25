# Dockerfile for chitchiat-app-be (Nest.js)

# ---- Base ----
FROM node:22.20.0-alpine3.22 AS base
WORKDIR /app
RUN npm install -g pnpm

# ---- Dependencies ----
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# ---- Build ----
FROM base AS build
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN pnpm run build

# ---- Production ----
FROM base AS production
ENV NODE_ENV=production

COPY --from=build /app/dist ./dist

EXPOSE 3001
CMD [ "node", "dist/main" ]
