const db = require('../db')

const userExists = query => db.Users.findOne(query, { _id: 1 }).then(userDoc => userDoc !== null)

exports.userExists = userExists
