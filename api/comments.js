const db = require('../db')

const COMMENT_FIELDS = {
  '_id': 1,
	'postedby': 1,
	'content': 1,
	'created': 1,
	'points': 1,
}

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

exports.get = get
