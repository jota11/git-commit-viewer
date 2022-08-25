#!/bin/bash

if [[ "$VERCEL_GIT_COMMIT_REF" != "master" || "$VERCEL_GIT_COMMIT_MESSAGE" =~ "[nobuild]" ]] ; then
  echo "Building cancelled."
  exit 0;
else
  echo "Building..."
  exit 1;
fi
