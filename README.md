This Git repository is Redis cache decorator for Hexagonal Architecture in NestJS
It's for demo in JavaScript Bangkok 2.0.0 (Oct 19 2024)
<br/>
[Get Slide Link](https://bit.ly/4h9bXzb)

## Prerequisite

- NodeJS 20+
- PNPM
- Docker

## Optional prerequisite

- REST client extension in VSCode

## How to run it

This repository have a Makefile for easy to setup and run with Docker compose

```bash
make init restart-and-logs-dev
```

Only run restart-and-logs-dev when already install dependencies

```bash
make restart-and-logs-dev
```

## How to call http request

- Open REST client extension in VSCode
- Import `./src/items/adapters/inbounds/items.v1.http`
- Run request
