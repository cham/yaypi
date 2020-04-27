const express = require('express')

const authMiddleware = require('./middleware/auth')

const usersController = require('../controllers/users')

const router = express.Router()

router.get('/me', authMiddleware.authorizedUser, usersController.getMe)

module.exports = router
