const config = {
  API_PORT: parseInt(process.env.YAYHOORAY_API_PORT),
  MONGODB_URL: process.env.YAYHOORAY_MONGODB_URL
}

const get = (str) => {
  if (!config.hasOwnProperty(str)) {
    throw new Error(`Property ${str} not found in app config`)
  }
  return config[str]
}

const check = () => Object.keys(config).forEach((k) => {
  if (config[k] === undefined) {
    throw new Error(`Configuration is missing '${k}' property`)
  }
})

const log = () => console.log(config)

exports.get = get
exports.check = check
exports.log = log
