#!/bin/bash
if [ -z ${1+x} ]; then
        echo "You must supply an auth token as the first parameter"
        exit 1
fi
if [ -z ${2+x} ]; then
	echo "You must supply a page number as the second parameter"
	exit 1
fi
if [ -z ${3+x} ]; then
	echo "You must supply a page size as the third parameter"
	exit 1
fi
if [ -z ${4+x} ]; then
	echo "You must supply a sort by field as the fourth parameter"
	exit 1
fi
if [ -z ${5+x} ]; then
	echo "You must supply a sort direction as the fifth parameter"
	exit 1
fi
curl	--header "Authorization: Bearer $1" \
	'http://localhost:3030/v1/threads?page='$2'&pageSize='$3'&sortBy='$4'&sortDir='$5
