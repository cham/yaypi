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

exports.login = login
