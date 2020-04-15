const commentsApi = require('../../api/comments')
const { isObjectId } = require('./helpers')

const create = (req, res, next) => {
  if (!req.commentPayload) {
    req.commentPayload = {}
  }
  if (!req.body.content) {
    return res.status(400).send({ message: '"content" body parameter is required' })
  }
  Object.assign(req.commentPayload, {
    author: req.user.username,
    content: req.body.content,
    threadId: req.thread.id
  })
  next()
}

const commentId = (req, res, next) => {
  if (!req.comment) {
    req.comment = {}
  }
  if (!isObjectId(req.params.commentId)) {
    return res.status(400).send({ message: 'Comment ID is not valid' })
  }
  commentsApi.exists({ _id: req.params.commentId })
    .then((commentExists) => {
      if (!commentExists) {
        return res.status(404).send({ message: 'Comment does not exist' })
      }
      req.comment.id = req.params.commentId
      next()
    })
}

const commentBelongsToThread = (req, res, next) => {
  if (!req.thread || !req.comment) {
    return res.status(500).send({ message: 'threadId and commentId middleware must be run before determining if a comment belongs to a thread' })
  }
  commentsApi.commentIsInThread({ _id: req.comment.id, threadId: req.thread.id })
    .then((isInThread) => {
      if (!isInThread) {
        return res.status(404).send({ message: 'Comment does not belong to this thread' })
      }
      next()
    })
}

exports.create = create
exports.commentId = commentId
exports.commentBelongsToThread = commentBelongsToThread
