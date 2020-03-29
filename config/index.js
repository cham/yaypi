const config = {
  API_PORT: parseInt(process.env.YAYHOORAY_API_PORT),
  MONGODB_URL: process.env.YAYHOORAY_MONGODB_URL,
  JWT_SECRET: process.env.YAYHOORAY_JWT_SECRET,
  MAX_URLNAME_ATTEMPTS: parseInt(process.env.YAYHOORAY_MAX_URLNAME_ATTEMPTS),
  ALLOWED_CATEGORIES: process.env.YAYHOORAY_ALLOWED_CATEGORIES.split(','),
  DEBUG: process.env.NODE_ENV === 'development'
}

const get = (str) => {
  if (!config.hasOwnProperty(str)) {
    throw new Error(`Property ${str} not found in app config`)
  }
  return config[str]
}

const check = () => Object.keys(config).forEach((k) => {
  if (config[k] === undefined || (typeof config[k] === 'number' && isNaN(config[k]))) {
    throw new Error(`Configuration is missing '${k}' property or NaN`)
  }
})

const log = () => console.log(config)

exports.get = get
exports.check = check
exports.log = log
