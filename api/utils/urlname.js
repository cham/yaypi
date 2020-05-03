const config = require('../../config')

const MAX_URLNAME_ATTEMPTS = config.get('MAX_URLNAME_ATTEMPTS')

const get = ({ schema, name, attempts = 1 }) => {
  if (attempts > MAX_URLNAME_ATTEMPTS) {
    throw new Error('Maximum urlname attempts exceeded')
  }
  const urlname = name.toLowerCase().replace(/[^a-z0-9]/g ,'-')
  return schema.findOne({ urlname }).then((doc) => {
    if (!doc) {
      return urlname
    }
    return get({ schema, name: `${urlname}-`, attempts: attempts + 1 })
  })
}

exports.get = get
