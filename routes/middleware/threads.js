const errorResponse = require('../../controllers/utils/errorResponse')

const ALLOWED_SORT_FIELDS = [
  'created',
  'last_comment_time',
  'name',
  'postedby',
  'numcomments'
]
const ALLOWED_SORT_DIRECTIONS = [
  'asc',
  'desc'
]

const sort = (req, res, next) => {
  if (!req.sort) {
    req.sort = {}
  }
  let field = 'created'
  let direction = -1
  if (req.query.sortBy) {
    if (ALLOWED_SORT_FIELDS.indexOf(req.query.sortBy) === -1){
      return errorResponse.userError({ res, message: `query parameter "sortBy" must be one of ${ALLOWED_SORT_FIELDS.join(', ')}` })
    }
    field = req.query.sortBy
  }
  if (req.query.sortDir) {
    if (ALLOWED_SORT_DIRECTIONS.indexOf(req.query.sortDir) === -1){
      return errorResponse.userError({ res, message: `query parameter "sortDir" must be one of ${ALLOWED_SORT_DIRECTIONS.join(', ')}` })
    }
    direction = req.query.sortDir === 'asc' ? 1 : -1
  }
  req.sort.field = field
  req.sort.direction = direction
  next()
}

exports.sort = sort
