FROM node:20.11.1-alpine AS builder

WORKDIR /usr/src/app

COPY . .

RUN npm install -g pnpm && \
  pnpm install && \
  pnpm prisma generate

COPY . .

RUN pnpm build

FROM alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app /usr/src/app

RUN apk update && apk upgrade && \
  apk add nodejs npm