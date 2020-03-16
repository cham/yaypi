const mongoose = require('mongoose')
const Schema = mongoose.Schema

const usersSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  urlname: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  last_ip: {
    type: String,
    required: true
  },
  last_login: {
    type: Date,
    default: Date.now()
  },
  created: {
    type: Date,
    default: Date.now()
  },
  modified: {
    type: Date,
    default: Date.now()
  },
  about: {
    type: String,
    required: false
  },
  custom_css: {
    type: String,
    required: true
  },
  custom_js: {
    type: String,
    required: true
  },
  fixed_chat_size: {
    type: Boolean,
    default: false
  },
  hide_enemy_posts: {
    type: Boolean,
    default: false
  },
  lastpointusage: {
    type: Date,
    default: Date.now()
  },
  location: {
    type: String,
    required: false
  },
  realname: {
    type: String,
    required: false
  },
  banned: {
    type: Boolean,
    required: false
  },
  membernumber: {
    type: Number
  },
  websites: [String], // array of some object?
  ignores: [String], // username
  buddies: [String], // username
  hidden: [String], // threadid
  favourites: [String], // threadid
  comment_size: {
    type: Number,
    default: 100
  },
  thread_size: {
    type: Number,
    default: 50
  },
  points: {
    type: Number,
    default: 0
  },
  comments_count: {
    type: Number,
    default: 0
  },
  threads_count: {
    type: Number,
    default: 0
  },
  random_titles: {
    type: Boolean,
    default: true
  },
  view_html: {
    type: Boolean,
    default: true
  },
  known_ips: [String]
}, {
  versionKey: false
})

usersSchema.index({ username: 1 }, { unique: true })

module.exports = mongoose.model('Users', usersSchema)
