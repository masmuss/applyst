#!/bin/sh

# Generate a changelog based on commit message prefixes
git log --pretty=format:"%s" | grep -E "^(feat|fix|chore):" | while read -r line; do
  case "$line" in
    feat:*) echo "### Features" && echo "- ${line#feat: }" ;;
    fix:*) echo "### Bug Fixes" && echo "- ${line#fix: }" ;;
    chore:*) echo "### Maintenance" && echo "- ${line#chore: }" ;;
  esac
done
