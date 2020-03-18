const mongoose = require('mongoose')
const config = require('../config')

const connect = () => mongoose.connect(config.get('MONGODB_URL'), {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch((e) => {
  console.error(e)
  process.exit()
})
mongoose.connection.on('error', e => console.warn(e))

mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

connect()

exports.connect = connect
exports.Comments = require('./schema/Comments')
exports.Threads = require('./schema/Threads')
exports.Users = require('./schema/Users')
