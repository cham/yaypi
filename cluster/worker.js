const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const config = require('../config')

const app = express()
const port = config.get('API_PORT')

app.use(cors())
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '50mb'
}))

app.use('/v1/ping', require('../routes/ping'))

const server = app.listen(port, () => {
  console.log(`Worker listening on port ${port}`);
})
server.setTimeout(8 * 60 * 1000)

module.exports = app
