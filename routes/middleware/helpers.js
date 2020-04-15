const isObjectId = str => !!str.match(/^[a-f\d]{24}$/i)

exports.isObjectId = isObjectId
