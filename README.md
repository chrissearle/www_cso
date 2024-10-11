# www.chrissearle.org

Nuxt based static site generator

## Setup

```shell
npm install
```

## Development Server

Start the development server on `http://localhost:3000`:

```shell
npm run dev
```

## Deployment

```shell
npm run generate
npx serve .output/public/
```

## Docker deployment

This builds and packages using a multistage docker build

```shell
docker build -t chrissearle/www_cso:latest .
```
