const threadsApi = require('../api/threads')
const commentsApi = require('../api/comments')
const errorResponse = require('./utils/errorResponse')

const payload = req => ({
  skip: req.pagination.skip,
  limit: req.pagination.limit,
  sortBy: (req.sort || {}).field,
  sortDir: (req.sort || {}).direction
})

const get = (req, res) => threadsApi.get(payload(req))
  .then(threads => res.send({ threads }))
  .catch(e => errorResponse.systemError({ res, message: e.message }))

const getOne = (req, res) => threadsApi.getOne({ _id: req.thread.id })
  .then(thread => res.send(thread))
  .catch(e => errorResponse.systemError({ res, message: e.message }))

const getOneWithComments = (req, res) => Promise.all([
    threadsApi.getOne({ _id: req.thread.id }),
    commentsApi.get(Object.assign({}, payload(req), { threadid: req.thread.id }))
  ])
  .then(([ thread, comments ]) => res.send(Object.assign({}, thread.toObject(), { comments })))
  .catch(e => errorResponse.systemError({ res, message: e.message }))

const create = (req, res) => threadsApi.create(req.threadPayload)
  .then(thread => res.status(201).send({ thread }))
  .catch(e => res.status(500).send({ message: e.message }))

exports.get = get
exports.getOne = getOne
exports.getOneWithComments = getOneWithComments
exports.create = create
