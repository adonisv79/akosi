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