const db = require('../db')

const THREAD_FIELDS = {
  _id: 1,
  created: 1,
  last_comment_by: 1,
  last_comment_time: 1,
  name: 1,
  nsfw: 1,
  postedby: 1,
  urlname: 1,
  numcomments: 1,
  categories: 1
}

const threadSorting = ({ sortBy, sortDir }) => {
  let sort = []
  sort[sortBy] = sortDir
  return sort
}

const get = ({ skip, limit, sortBy, sortDir }) => db.Threads.find(
  {},
  THREAD_FIELDS,
  {
    sort: { [sortBy]: sortDir },
    skip,
    limit
  }
)

exports.get = get