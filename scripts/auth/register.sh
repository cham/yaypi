#!/bin/bash
if [ -z ${1+x} ]; then
	echo "You must supply a username as the first parameter"
	exit 1
fi
if [ -z ${2+x} ]; then
	echo "You must supply a password as the second parameter"
	exit 1
fi
if [ -z ${3+x} ]; then
	echo "You must supply an email address as the third parameter"
	exit 1
fi
curl	--header "Content-type: application/json" \
	--data '{"username": "'$1'", "password": "'$2'", "email": "'$3'"}' \
	http://localhost:3030/v1/auth/register
echo ""
