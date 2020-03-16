const express = require('express')

const authMiddleware = require('./middleware/auth')
const paginationMiddleware = require('./middleware/pagination')
const threadsMiddleware = require('./middleware/threads')

const threadsController = require('../controllers/threads')

const router = express.Router()

router.get('/', authMiddleware.authorizedUser, paginationMiddleware.pagination, threadsMiddleware.sort, threadsController.get)

module.exports = router
