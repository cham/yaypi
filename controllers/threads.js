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

const getOneWithComments = (req, res) => Promise.all([
    threadsApi.getOne({ _id: req.thread.id }),
    commentsApi.get(Object.assign({}, payload(req), { threadid: req.thread.id }))
  ])
  .then(([ thread, comments ]) => res.send(Object.assign({}, thread.toObject(), { comments })))
  .catch(e => errorResponse.systemError({ res, message: e.message }))

exports.get = get
exports.getOneWithComments = getOneWithComments
