#!/bin/bash
if [ -z ${1+x} ]; then
        echo "You must supply an auth token as the first parameter"
        exit 1
fi
if [ -z ${2+x} ]; then
	echo "You must supply a thread name as the second parameter"
	exit 1
fi
if [ -z ${3+x} ]; then
	echo "You must supply post content as the third parameter"
	exit 1
fi
if [ -z ${4+x} ]; then
	echo "You must supply a category as the fourth parameter"
	exit 1
fi
curl	--header "Authorization: Bearer $1" \
	--header "Content-type: application/json" \
	--data '{"name": "'$2'", "content": "'$3'", "categories": ["'$4'"]}' \
	http://localhost:3030/v1/threads
