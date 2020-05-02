#!/bin/bash
if [ -z ${1+x} ]; then
        echo "You must supply an auth token as the first parameter"
        exit 1
fi
if [ -z ${2+x} ]; then
	echo "You must supply a thread urlname as the second parameter"
	exit 1
fi
curl	--header "Authorization: Bearer $1" \
	-v \
	'http://localhost:3030/v1/threads/'$2
echo ""
