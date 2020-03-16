const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db')
const config = require('../config')

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
  .then(userDoc => jwt.sign(userDoc.toObject(), config.get('JWT_SECRET')))

exports.login = login
exports.getToken = getToken
