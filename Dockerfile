FROM node:23-alpine AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run generate

FROM nginx AS deploy

COPY --from=build /app/.output/public/ /usr/share/nginx/html
