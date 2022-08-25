#!/bin/bash

if [[ "$VERCEL_GIT_COMMIT_REF" == "master" || "$VERCEL_GIT_COMMIT_REF" == "staging" ]]
then
  echo "Building..."
  exit 1;
else
  echo "Building cancelled."
  exit 0;
fi
