const create = (req, res, next) => {
  if (!req.commentPayload) {
    req.commentPayload = {}
  }
  if (!req.body.content) {
    return res.status(400).send({ message: '"content" body parameter is required' })
  }
  Object.assign(req.commentPayload, {
    author: req.user.username,
    content: req.body.content,
    threadId: req.thread.id
  })
  next()
}

exports.create = create
