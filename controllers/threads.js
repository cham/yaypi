const threadsApi = require('../api/threads')
const errorResponse = require('./utils/errorResponse')

const payload = req => ({
  skip: req.pagination.skip,
  limit: req.pagination.limit,
  sortBy: req.sort.field,
  sortDir: req.sort.direction
})

const get = (req, res) => threadsApi.get(payload(req))
  .then(threads => res.send({ threads }))
  .catch(e => errorResponse.systemError({ res, message: e.message }))

exports.get = get
