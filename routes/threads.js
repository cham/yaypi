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
router.get('/:threadUrlname', authMiddleware.authorizedUser, paginationMiddleware.pagination, threadsMiddleware.threadUrlname, threadsController.getOne)
router.post('/:threadUrlname', authMiddleware.authorizedUser, threadsMiddleware.threadUrlname, commentsMiddleware.create, commentsController.create)
router.get('/:threadUrlname/comments', authMiddleware.authorizedUser, paginationMiddleware.pagination, threadsMiddleware.threadUrlname, threadsController.getOneWithComments)
router.get('/:threadUrlname/comments/:commentId', authMiddleware.authorizedUser, paginationMiddleware.pagination, threadsMiddleware.threadUrlname, commentsMiddleware.commentId, commentsMiddleware.commentBelongsToThread, commentsController.getOne)

module.exports = router
