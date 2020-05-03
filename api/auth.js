const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db')
const config = require('../config')

const JWT_SECRET = config.get('JWT_SECRET')


const register = ({ username, password, email }) =>
  new Promise((resolve, reject) => {
    const saltRounds = 10
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        return reject(err)
      }
      db.Users.create({
        username,
        email,
        password: hash,
        created: new Date(),
        urlname: '',
        last_ip: '',
        custom_css: '',
        custom_js: '',
      }).then(resolve)
    })
  })

const login = ({ username, password }) => db.Users.findOne({ username }, { password: 1 })
  .then(userDoc => new Promise((resolve, reject) => bcrypt.compare(password, userDoc.password, (err, passwordMatch) => {
    if (err) {
      return reject(err)
    }
    resolve(passwordMatch)
  })))

const getToken = ({ username }) => db.Users.findOne({ username }, { _id: 1, username: 1, urlname: 1 })
  .then(userDoc => jwt.sign(userDoc.toObject(), JWT_SECRET))

const verifyToken = ({ token }) => new Promise((resolve, reject) => jwt.verify(token, JWT_SECRET, (err, decoded) => {
  if (err) {
    return reject(err)
  }
  resolve(decoded)
}))


exports.register = register
exports.login = login
exports.getToken = getToken
exports.verifyToken = verifyToken
