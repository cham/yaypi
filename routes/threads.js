const express = require('express')

const authMiddleware = require('./middleware/auth')
const paginationMiddleware = require('./middleware/pagination')
const threadsMiddleware = require('./middleware/threads')

const threadsController = require('../controllers/threads')

const router = express.Router()

router.post('/', authMiddleware.authorizedUser, threadsMiddleware.create, threadsController.create)
router.get('/', authMiddleware.authorizedUser, paginationMiddleware.pagination, threadsMiddleware.sort, threadsController.get)
router.get('/:threadId', authMiddleware.authorizedUser, paginationMiddleware.pagination, threadsMiddleware.threadId, threadsController.getOneWithComments)

module.exports = router
