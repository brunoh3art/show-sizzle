FROM node:20-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install -g pnpm && \
  pnpm install && \
  pnpm prisma generate

COPY . .

RUN pnpm build

FROM alpine

WORKDIR /app

COPY --from=builder /app /app

RUN apk update && apk upgrade && \
  apk add nodejs npm