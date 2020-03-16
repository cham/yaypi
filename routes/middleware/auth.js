const authApi = require('../../api/auth')
const usersApi = require('../../api/users')
const errorResponse = require('../../controllers/utils/errorResponse')

const login = (req, res, next) => {
  if (!req.auth) {
    req.auth = {}
  }
  if (!req.body.username) {
    return errorResponse.userError({ res, message: 'body parameter "username" is required' })
  }
  if (!req.body.password) {
    return errorResponse.userError({ res, message: 'body parameter "password" is required' })
  }
  usersApi.userExists({ username: req.body.username })
    .then((exists) => {
      if (!exists) {
        return errorResponse.userError({ res, message: 'User does not exist' })
      }
      req.auth.username = req.body.username
      req.auth.password = req.body.password
      next()
    })
}

const authorizedUser = (req, res, next) => {
  if (!req.headers.authorization) {
    return errorResponse.userError({ res, message: 'An Authorization header containing a valid token is required to access this resource', status: 401 })
  }
  req.token = req.headers.authorization.replace('Bearer ', '')
  authApi.verifyToken({ token: req.token })
    .then((userData) => {
      if (!userData) {
        return errorResponse.userError({ res, message: 'Invalid token', status: 401 })
      }
      usersApi.userBanned(userData)
        .then((userIsBanned) => {
          if (userIsBanned) {
            return errorResponse.userError({ res, message: 'This account has been banned', status: 403 })
          }
          req.user = userData
          next()
        })
    })
}

exports.login = login
exports.authorizedUser = authorizedUser
