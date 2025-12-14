# syntax=docker/dockerfile:1.20

FROM node:24-bookworm-slim AS build

ARG IMAGE_TAG
ENV NUXT_PUBLIC_IMAGE_TAG=$IMAGE_TAG

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

RUN rm -rf .nuxt
RUN pnpm nuxi prepare

RUN pnpm run build

FROM node:24-bookworm-slim AS deploy

ARG IMAGE_TAG
ENV NUXT_PUBLIC_IMAGE_TAG=$IMAGE_TAG
ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/.output ./

CMD ["node", "./server/index.mjs"]
