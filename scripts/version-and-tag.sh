#!/bin/sh

APPNAME="applyst"

# Extract the latest version from commit messages
VERSION=$(git log --pretty=format:"%s" | grep -Eo "v[0-9]+\.[0-9]+\.[0-9]+" | head -n 1)

if [ -z "$VERSION" ]; then
  echo "No version found in commit messages."
  exit 1
fi

# Build and tag the Docker image
docker build -t $APPNAME:$VERSION .
docker tag $APPNAME:$VERSION $APPNAME:latest

echo "Docker image tagged as $APPNAME:$VERSION and $APPNAME:latest"
