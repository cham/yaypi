#!/bin/bash
. ~/.nvm/nvm.sh
export $(grep -v '^#' .env | xargs)
nvm use
node .
