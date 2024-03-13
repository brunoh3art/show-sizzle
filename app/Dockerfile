FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install -g pnpm && \
  pnpm install && \
  pnpm prisma generate

COPY . .

RUN pnpm build

EXPOSE 3000
CMD [ "pnpm", "start:prod" ]