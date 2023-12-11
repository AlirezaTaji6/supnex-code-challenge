## Description

Modules:

- unit
- raw-material
  - raw material category
  - prices (based on each supplier)
- stock-transactions (storing stock changes and each raw material balance)

## Installation

Copy `.env.example` to `.env` and override credintials

```bash
$ yarn install
```

## Running the app

Copy `.env.test.example` to `.env.test` and override credintials

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Stay in touch

- Author - Alireza Taji
- Email - alirezataji6@gmail.com
