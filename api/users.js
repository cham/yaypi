const db = require('../db')

const userExists = query => db.Users.findOne(query, { _id: 1 }).then(userDoc => userDoc !== null)

const userBanned = ({ _id }) => db.Users.findOne({ _id }, { banned: 1 }).then(userDoc => userDoc.banned)

exports.userExists = userExists
exports.userBanned = userBanned
