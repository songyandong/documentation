#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd .vuepress/dist

# if you are deploying to a custom domain
echo 'docs.pp.io' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:ChangMM/ChangMM.github.io.git master
git push -f git@github.com:ppio/ppio.github.io.git master

cd -
