#!/bin/bash
if [ -z ${1+x} ]; then
        echo "You must supply an auth token as the first parameter"
        exit 1
fi
curl	--header "Authorization: Bearer $1" \
	'http://localhost:3030/v1/users/me'
echo ""
