mongo -- "$MONGO_INITDB_DATABASE" <<EOF
  db.createUser({
    user: "$MONGO_INITDB_ROOT_USERNAME",
    pwd: "$MONGO_INITDB_ROOT_PASSWORD",
    roles: ["dbOwner"]
  })

  db.getSiblingDB('admin').auth(
    "$MONGO_INITDB_ROOT_USERNAME",
    "$MONGO_INITDB_ROOT_PASSWORD"
  )
EOF
