#!/bin/sh
npm run test:ganache > /dev/null & sleep 10 && npm run test:ganache
