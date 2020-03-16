const errorResponse = require('../../controllers/utils/errorResponse')

const pagination = (req, res, next) => {
  if (!req.pagination) {
    req.pagination = {}
  }
  let page = 1
  let pageSize = 50
  if (req.query.page) {
    page = parseInt(req.query.page)
    if (isNaN(page) || page < 1) {
      return errorResponse.userError({ res, message: 'query parameter "page" must be a positive integer' })
    }
  }
  if (req.query.pageSize) {
    pageSize = parseInt(req.query.pageSize)
    if (isNaN(pageSize) || pageSize < 1 || pageSize > 200) {
      return errorResponse.userError({ res, message: 'query parameter "pageSize" must be an integer between 1 and 200' })
    }
  }
  req.pagination.skip = (page - 1) * pageSize
  req.pagination.limit = pageSize
  next()
}

exports.pagination = pagination
