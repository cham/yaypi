const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentsSchema = new Schema({
  threadid: {
    type: String,
    required: true
  },
	postedby: {
    type: String,
    required: true
  },
	content: {
    type: String,
    required: true
  },
	created: {
    type: Date,
    required: true
  },
	points: {
    type: Number,
    default: 0
  }
}, {
  versionKey: false
})

module.exports = mongoose.model('Comments', commentsSchema)
