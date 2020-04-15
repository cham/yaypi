#!/bin/bash
if [ -z ${1+x} ]; then
        echo "You must supply an auth token as the first parameter"
        exit 1
fi
if [ -z ${2+x} ]; then
	echo "You must supply a thread id as the second parameter"
	exit 1
fi
if [ -z ${3+x} ]; then
	echo "You must supply a page number as the third parameter"
	exit 1
fi
if [ -z ${4+x} ]; then
	echo "You must supply a page size as the fourth parameter"
	exit 1
fi
curl	--header "Authorization: Bearer $1" \
	'http://localhost:3030/v1/threads/'$2'/comments?page='$3'&pageSize='$4
echo ""
