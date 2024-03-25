# AKOSI Backend

## Description

AKOSI API is an open-source user management system api dedicated to data-privacy.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
## Open-API Swagger

This project relies heavily on swagger not only for documentation but also for type definitions for consuming clients. It is important to define your DTOs correectly in order to make development a breeeze.

## Stay in touch

- Author - [Adonis Villamor](https://bytecommander.com)
- Website - [https://bytecommander.com](https://bytecommander.com/)


# MYSQL

## Install mysql via docker

To easily setup your local environment using docker, run the following

```
docker run --name mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=admin -d mysql:8.3
```

# Docker

We use docker for this nodejs project. Build a new image by running `pnpm docker:build` ( use `pnpm docker:build-win` if you are on windows). make sure to upgrade the package version when building a new image for deployment.

Once the image is created, we can test run it locally using the following. (Do not forget to update the tag `vX.Y.Z` to the right version). Make sure to also set the DATABASE_URL to connect to the correct mysql IP. if this is container hosted in your local docker, the IP will be found when you inspect the container.

```
docker run -d -p 3100:3000 --name akosi-api \
  -e DATABASE_URL=mysql://dbusername:dbpassword@255.255.255.255:3306/akosi \
  -e JWT_SECRET=hakunamatata
  adonisv79/akosi-api:X.Y.Z
```

To publish, run `docker:publish` or `docker:publish-win` for windows