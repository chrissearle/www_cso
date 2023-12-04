# www.chrissearle.org

NuxtJS based site generator for www.chrissearle.org

## Github Actions

Any push of main or a tag v\* will trigger github actions to run.

- main -> will build and push a staging image (:staging)
- v\* tag -> will build and push a promoted image (:latest) - tag name has to start v and since this is not software the format is YYYYMMDDXX where XX is zero padded "release count that day".

## NPM

- dev - run dev server
- build - build
- preview - preview build

## Docker

Local docker build:

docker build -t www-cso:latest .

Run local build:

docker run --rm -d -p 3000:3000 --name www-cso www-cso:latest
