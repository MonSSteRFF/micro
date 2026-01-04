FROM node:18-alpine

RUN apk add --no-cache protobuf-dev protobuf bash

RUN corepack enable && corepack prepare pnpm@latest --activate

WORKDIR /app