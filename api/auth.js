const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const db = require('../db')
const config = require('../config')
const urlname = require('./utils/urlname')

const JWT_SECRET = config.get('JWT_SECRET')
const SALT_ROUNDS = config.get('SALT_ROUNDS')

const createQuery = ({ username, email, password, urlname, ip }) => ({
  username,
  email,
  password,
  urlname,
  created: new Date(),
  last_ip: ip
})

const register = ({ username, password, email, ip }) => urlname.get({ schema: db.Users, name: username})
  .then(urlname => new Promise((resolve, reject) => {
    bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
      if (err) {
        return reject(err)
      }
      db.Users.create(createQuery({ username, email, password: hash, ip, urlname }))
        .then(resolve)
        .catch(reject)
    })
  }))

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
