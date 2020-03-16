const mongoose = require('mongoose')
const Schema = mongoose.Schema

const threadsSchema = new Schema({
  created: {
    type: Date,
    required: true
  },
  last_comment_by: {
    type: String,
    required: true
  },
  last_comment_time: {
    type: Date,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  nsfw: {
    type: Boolean,
    default: false
  },
  postedby: {
    type: String,
    required: true
  },
  urlname: {
    type: String,
    required: true
  },
  numcomments: {
    type: Number,
    default: 1
  },
  categories: {
    type: [String],
    enum: [
      'Advice',
      'Discussions',
      'Meaningless',
      'Projects'
    ],
    required: true
  }
}, {
  versionKey: false
})

threadsSchema.index({ urlname: 1 }, { unique: true })

module.exports = mongoose.model('Threads', threadsSchema)
