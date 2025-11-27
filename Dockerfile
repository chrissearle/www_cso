# syntax=docker/dockerfile:1.20

FROM --platform=$BUILDPLATFORM node:24-alpine AS build

ARG IMAGE_TAG
ENV NUXT_PUBLIC_IMAGE_TAG=$IMAGE_TAG

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

FROM node:24-alpine AS deploy

WORKDIR /app
COPY --from=build /app/.output/ /app

CMD ["node", "/app/server/index.mjs"]
