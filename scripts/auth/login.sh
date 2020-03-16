#!/bin/bash
if [ -z ${1+x} ]; then
	echo "You must supply a username as the first parameter"
	exit 1
fi
if [ -z ${2+x} ]; then
	echo "You must supply a password as the second parameter"
	exit 1
fi
curl	--header "Content-type: application/json" \
	--data '{"username": "'$1'", "password": "'$2'"}' \
	http://localhost:3030/v1/auth/login
