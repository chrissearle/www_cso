FROM node:22-alpine AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run generate

FROM node:22-alpine AS deploy

WORKDIR /app
COPY --from=build /app/.output/public/ .

ENV NODE_ENV=production

EXPOSE 3000

RUN npm install -g serve

CMD [ "npx", "serve", "." ]
