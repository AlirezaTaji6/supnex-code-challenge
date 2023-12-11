#!/bin/bash

DATABASE="${DATABASE_HOST}:${DATABASE_PORT}"
echo "Wait for DATABASE=${DATABASE}"

wait-for-it ${DATABASE}

node dist/main.js
