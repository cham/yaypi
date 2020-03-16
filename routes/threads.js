const express = require('express')

const paginationMiddleware = require('./middleware/pagination')
const threadsMiddleware = require('./middleware/threads')

const threadsController = require('../controllers/threads')

const router = express.Router()

router.get('/', paginationMiddleware.pagination, threadsMiddleware.sort, threadsController.get)

module.exports = router
