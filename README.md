# www.chrissearle.org

Gatsby based site generator for www.chrissearle.org

## Available tasks

For all tasks - see Makefile. Some of the most common:

make develop - start gatsby in develop mode

make package - build and create docker image

make stage - send package to dockerhub with `:staging`

make promote - tag the current `:staging` with `:latest`
