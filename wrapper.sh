#!/bin/bash
set -e 
mkdir -p db
ganache-cli -d --db db -i 50 -l 10000000 &
PID=$!
gsc-run config.json addresses.json
# stop ganache
kill $PID
