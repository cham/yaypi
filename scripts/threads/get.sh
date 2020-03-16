#!/bin/bash
if [ -z ${1+x} ]; then
	echo "You must supply a page number as the first parameter"
	exit 1
fi
if [ -z ${2+x} ]; then
	echo "You must supply a page size as the second parameter"
	exit 1
fi
if [ -z ${3+x} ]; then
	echo "You must supply a sort by field as the third parameter"
	exit 1
fi
if [ -z ${4+x} ]; then
	echo "You must supply a sort direction as the fourth parameter"
	exit 1
fi
curl	'http://localhost:3030/v1/threads?page='$1'&pageSize='$2'&sortBy='$3'&sortDir='$4
