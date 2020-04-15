# www.chrissearle.org

Gatsby based site generator for www.chrissearle.org

## Github Actions

Any push of master or a tag v* will trigger github actions to run.

* Master -> will build and push a staging image (:staging)
* v* tag -> will build and push a promoted image (:latest) - tag name has to start v and since this is not software the format is YYYYMMDDXX where XX is zero padded "release count that day".

## Available tasks

**Note that for package, stage and promote - github actions are set up - so these should not be used in general**

For all tasks - see Makefile. Some of the most common:

make develop - start gatsby in develop mode

make package - build and create docker image

make stage - send package to dockerhub with `:staging`

make promote - tag the current `:staging` with `:latest`
