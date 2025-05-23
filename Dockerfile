FROM node:23-alpine AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:23-alpine AS deploy

WORKDIR /app
COPY --from=build /app/.output/ /app
CMD ["node", "/app/server/index.mjs"]