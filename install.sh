#!/bin/bash
if [ ! -f ~/.nvm/nvm.sh ]; then
    echo "Please install nvm - https://github.com/creationix/nvm#install-script"
    exit 1
fi
. ~/.nvm/nvm.sh
nvm install || { echo "NVM could not install Node - did the nvm installation complete successfully?"; exit 1; }
nvm use || { echo "NVM could not set the Node version - did the nvm installation complete successfully?"; exit 1; }
unset npm_config_prefix
npm install || { echo "NPM could not run successfully - did the nvm installation complete successfully?"; exit 1; }
echo "+---------------------------------------------------------------------------------------+"
echo "|                                                                                       |"
echo "| Installation successful!                                                              |"
echo "|                                                                                       |"
echo "+---------------------------------------------------------------------------------------+"
