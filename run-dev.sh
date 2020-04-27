#!/bin/bash
if [ ! -d node_modules ]; then
  ( "./install.sh" )
fi
if [ -f /.dockerenv ]; then
  npm run watch
else
  . ~/.nvm/nvm.sh
  export $(grep -v '^#' .env | xargs)
  nvm use
  node .
fi
