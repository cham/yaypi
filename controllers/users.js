const authApi = require('../api/auth')

const getMe = (req, res) => res.send(req.user)

exports.getMe = getMe
