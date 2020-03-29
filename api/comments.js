const db = require('../db')

const COMMENT_FIELDS = {
  '_id': 1,
	'postedby': 1,
	'content': 1,
	'created': 1,
	'points': 1,
}

const clean = obj => Object.keys(obj).reduce((memo, key) => {
  if (COMMENT_FIELDS.hasOwnProperty(key)) {
    memo[key] = obj[key]
  }
  return memo
}, {})

const createQuery = ({ threadId, author, content  }) => ({
  threadid: threadId,
  postedby: author,
  created: new Date(),
  content
})

const get = ({ skip, limit, threadid }) => db.Comments.find(
  {
    threadid
  },
  COMMENT_FIELDS,
  {
    sort: { created: 1 },
    skip,
    limit
  }
)

const create = ({ threadId, author, content }) => db.Comments.create(createQuery({ threadId, author, content }))
  .then(doc => clean(doc.toObject()))

exports.get = get
exports.create = create
