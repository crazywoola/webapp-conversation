#!/usr/bin/env bash

set -eo pipefail

SHA=$(git rev-parse HEAD)
REPO_NAME=${IMAGE_NAME}
LATEST_TAG="latest"

cat<<EOF
  Rolling with tags:
  - ${REPO_NAME}:${SHA}
  - ${REPO_NAME}:${LATEST_TAG}
EOF

#
# Build image
#
docker build \
  -t "${REPO_NAME}:${SHA}" \
  -t "${REPO_NAME}:${LATEST_TAG}" \
  --label "sha=${SHA}" \
  --label "built_at=$(date)" \
  --label "build_actor=${GITHUB_ACTOR}" \
  .

# push
docker push --all-tags "${REPO_NAME}"