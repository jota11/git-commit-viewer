# git-commit-viewer

A simple way to display your step-by-step development process for users. Inspired by [Facepunch's](https://commits.facepunch.com).

[Live preview](https://git-commit-viewer.vercel.app/)

## Getting Started

This project is currently in a very early WIP state, the basic features work okay so I figured I would publish them already.

Currently only GitHub and GitLab are supported, but I plan on adding support for others in the future.

## Running Locally

- Clone the repository
- `npm install`
- `npm run dev`
- When you're ready to deploy `npm run build`
- Then `npm run start` to see if everything went okay

## TODO?

There is a bunch of TODOs in this, like writing a proper documentation explaining how things work and cleaning up the mess. Currently they are scattered across the files as I write them, so I will have to write them elsewhere later. And probably write a better README too. Ok.


## Handling API keys in .env

### GitHub

When creating a token, follow these steps:

- Select the repositories you want to track
- Grant read-only access to the "Contents" permission
- Set the token in the GITHUB_APIKEY variable

That is it. You are done. Nothing else needed. (The "Metadata" permission is also needed, but it is already marked by default)


### GitLab

When creating a token, follow these steps:

- Grant access to the "read_api" permission
- Set the token in the GITLAB_APIKEY variable

That is it. You are done. Nothing else needed.
