const express = require('express')

const authMiddleware = require('./middleware/auth')

const authController = require('../controllers/auth')

const router = express.Router()

router.post('/login', authMiddleware.login, authController.login)
router.post('/register', authMiddleware.register, authController.register)

module.exports = router
