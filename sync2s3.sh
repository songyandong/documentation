#!/bin/bash

npm run sub

# sync local files to S3:bucket
aws s3 sync ./dist s3://docs.pp.io/docs --acl public-read

# create cloudfront distribution invalidation
aws cloudfront create-invalidation --distribution-id ECJMUYDIF91JL --paths /docs/*
