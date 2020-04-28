const authApi = require('../api/auth')
const errorResponse = require('./utils/errorResponse')

const payload = req => ({
  username: req.auth.username,
  password: req.auth.password,
  email: req.auth.email,
})

const register = (req, res) => authApi.register(payload(req))
  .then((success) => {
    if (!success) {
      return errorResponse.userError({ res, message: 'Could not register' })
    }
    return authApi.getToken(payload(req))
      .then(token => res.send({ token }))
  })
  .catch(e => errorResponse.systemError({ res, message: e.message }))

const login = (req, res) => authApi.login(payload(req))
  .then((success) => {
    if (!success) {
      return errorResponse.userError({ res, message: 'Username or password not found' })
    }
    return authApi.getToken(payload(req))
      .then(token => res.send({ token }))
  })
  .catch(e => errorResponse.systemError({ res, message: e.message }))

exports.register = register
exports.login = login
