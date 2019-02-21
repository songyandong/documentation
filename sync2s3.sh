#!/bin/bash

# build
npm run sub

# delete all .DS_Store file
find . -name '.DS_Store' -type f -delete

# sync local files to S3:bucket
aws s3 sync .vuepress/dist s3://docs.pp.io2/docs --acl public-read --exclude '.git/*'

# create cloudfront distribution invalidation
aws cloudfront create-invalidation --distribution-id E1VRFX5KBKXI4R --paths /docs/*
