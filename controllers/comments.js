const commentsApi = require('../api/comments')
const threadsApi = require('../api/threads')

const create = (req, res) => commentsApi.create(req.commentPayload)
  .then(comment => res.status(201).send({ comment }))
  .catch(e => res.status(500).send({ message: e.message }))

const getOne = (req, res) => commentsApi.getOne({ _id: req.comment.id })
  .then(comment => res.send({ comment }))
  .catch(e => res.status(500).send({ message: e.message }))

exports.create = create
exports.getOne = getOne
