# Contributing to this repository

## Getting started

Before you begin:

-   Have you read the [code of conduct](CODE_OF_CONDUCT.md)?
-   Check out the [existing issues](issues)
-   Insure that you have installed the latest version of (Docker)[https://docs.docker.com/get-docker/]
-   The website is powered by NodeJS and (yarn)[https://yarnpkg.com/]. Check if you have the required versions

## Running locally

-   Populate .env files in /server and /osm-integration
    (Maps API key is from Google and Air Quality key is from ...)
-   Compose docker images in /server with `docker compose --env-file ./server/.env up -d`
-   Install dependencies in /client and /server then run `yarn build`
-   If you chose to run with (pm2)[https://pm2.keymetrics.io/], an .env file must be present in the root directory
