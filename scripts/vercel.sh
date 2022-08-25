#!/bin/bash

if [[ "$VERCEL_GIT_COMMIT_REF" == "master" || "$VERCEL_GIT_COMMIT_REF" == "staging" ]]
then
  echo "Building..."
  exit 1;
elif [[ "$VERCEL_GIT_COMMIT_MESSAGE" =~ "[nobuild]" ]]
then
  echo "Building..."
  exit 0;
else
  echo "Building cancelled."
  exit 0;
fi
