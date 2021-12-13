#!/bin/sh

node /app/server/main.js

tail -f /var/logs/**/*.log