const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db')
const config = require('../config')

const JWT_SECRET = config.get('JWT_SECRET')

const login = ({ username, password }) => db.Users.findOne({ username }, { password: 1 })
  .then(userDoc => new Promise((resolve, reject) => bcrypt.compare(password, userDoc.password, (err, passwordMatch) => {
    if (err) {
      return reject(err)
    }
    if (passwordMatch) {
      return resolve(true)
    }
    return resolve(false)
  })))

const getToken = ({ username }) => db.Users.findOne({ username }, { _id: 1 })
  .then(userDoc => jwt.sign(userDoc.toObject(), JWT_SECRET))

const verifyToken = ({ token }) => new Promise((resolve) => jwt.verify(token, JWT_SECRET, (err, decoded) => {
  if (err) {
    return resolve(null)
  }
  resolve(decoded)
}))


exports.login = login
exports.getToken = getToken
exports.verifyToken = verifyToken
