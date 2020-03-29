const db = require('../db')
const commentsApi = require('./comments')
const config = require('../config')

const MAX_URLNAME_ATTEMPTS = config.get('MAX_URLNAME_ATTEMPTS')

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

const clean = obj => Object.keys(obj).reduce((memo, key) => {
  if (THREAD_FIELDS.hasOwnProperty(key)) {
    memo[key] = obj[key]
  }
  return memo
}, {})

const createQuery = ({ author, name, categories, nsfw, urlname }) => ({
  created: new Date(),
  postedby: author,
  last_comment_by: author,
  last_comment_time: new Date(),
  name,
  nsfw,
  urlname,
  categories
})

const get = ({ skip, limit, sortBy, sortDir }) => db.Threads.find(
  {},
  THREAD_FIELDS,
  {
    sort: { [sortBy]: sortDir },
    skip,
    limit
  }
)

const getOne = ({ _id }) => db.Threads.findOne({ _id }, THREAD_FIELDS)

const exists = ({ _id }) => getOne({ _id }).then(threadDoc => threadDoc !== null)

const getThreadUrlname = ({ name, attempts = 1 }) => {
  if (attempts > MAX_URLNAME_ATTEMPTS) {
    throw new Error('Maximum urlname attempts exceeded')
  }
  const urlname = name.toLowerCase().replace(/[^a-z0-9]/g ,'-')
  return db.Threads.findOne({ urlname }).then((threadDoc) => {
    if (!threadDoc) {
      return urlname
    }
    return getThreadUrlname({ name: `${urlname}-`, attempts: attempts + 1 })
  })
}

const remove = ({ _id }) => db.Threads.deleteOne({ _id })

const create = ({ author, name, content, categories, nsfw, urlname }) => db.Threads.create(createQuery({ author, name, categories, nsfw, urlname }))
  .then((doc) => {
    return commentsApi.create({ threadId: doc._id, author, content })
      .then((commentDoc) => {
        return Object.assign(clean(doc.toObject()), { comments: [commentDoc] })
      })
      .catch(e => remove(doc).then(() => { throw e }))
  })

exports.get = get
exports.getOne = getOne
exports.exists = exists
exports.getThreadUrlname = getThreadUrlname
exports.create = create
