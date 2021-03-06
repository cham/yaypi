const errorResponse = require('../../controllers/utils/errorResponse')
const threadsApi = require('../../api/threads')
const config = require('../../config')
const { isObjectId } = require('./helpers')

const ALLOWED_CATEGORIES = config.get('ALLOWED_CATEGORIES')

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

const threadUrlname = (req, res, next) => {
  if (!req.thread) {
    req.thread = {}
  }
  threadsApi.exists({ urlname: req.params.threadUrlname })
    .then((threadExists) => {
      if (!threadExists) {
        return res.status(404).send({ message: 'Thread does not exist' })
      }
      return threadsApi.getOne({ urlname: req.params.threadUrlname })
        .then((threadDoc) => {
          req.thread.id = threadDoc._id
          next()
        })
    })
    .catch(e => res.status(500).send({ message: e.message }))
}

const create = (req, res, next) => {
  if (!req.threadPayload) {
    req.threadPayload = {}
  }
  let nsfw = false
  if (!req.body.name) {
    return res.status(400).send({ message: '"name" body parameter is required' })
  }
  if (!req.body.content) {
    return res.status(400).send({ message: '"content" body parameter is required' })
  }
  if (req.body.nsfw && req.body.nsfw === true || req.body.nsfw === 1) {
    nsfw = true
  }
  if (!req.body.categories || !Array.isArray(req.body.categories)) {
    return res.status(400).send({ message: '"categories" array is required' })
  }
  if (req.body.categories.find(category => ALLOWED_CATEGORIES.indexOf(category) === -1)) {
    return res.status(400).send({ message: `"categories" entries may only contain one or more of ${ALLOWED_CATEGORIES.join(', ')}` })
  }
  Object.assign(req.threadPayload, {
    author: req.user.username,
    name: req.body.name,
    content: req.body.content,
    categories: Array.from(new Set(req.body.categories)),
    nsfw
  })
  next()
}

exports.sort = sort
exports.threadUrlname = threadUrlname
exports.create = create
