const express = require('express')

const authMiddleware = require('./middleware/auth')
const paginationMiddleware = require('./middleware/pagination')
const threadsMiddleware = require('./middleware/threads')
const commentsMiddleware = require('./middleware/comments')

const threadsController = require('../controllers/threads')
const commentsController = require('../controllers/comments')

const router = express.Router()

router.post('/', authMiddleware.authorizedUser, threadsMiddleware.create, threadsController.create)
router.get('/', authMiddleware.authorizedUser, paginationMiddleware.pagination, threadsMiddleware.sort, threadsController.get)
router.get('/:threadId', authMiddleware.authorizedUser, paginationMiddleware.pagination, threadsMiddleware.threadId, threadsController.getOne)
router.post('/:threadId', authMiddleware.authorizedUser, threadsMiddleware.threadId, commentsMiddleware.create, commentsController.create)
router.get('/:threadId/comments', authMiddleware.authorizedUser, paginationMiddleware.pagination, threadsMiddleware.threadId, threadsController.getOneWithComments)
router.get('/:threadId/comments/:commentId', authMiddleware.authorizedUser, paginationMiddleware.pagination, threadsMiddleware.threadId, commentsMiddleware.commentId, commentsMiddleware.commentBelongsToThread, commentsController.getOne)

module.exports = router
