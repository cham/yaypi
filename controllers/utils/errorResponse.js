const userError = ({ res, message }) => res.status(400).send({ message })

const systemError = ({ res, message }) => res.status(500).send({ message })

exports.userError = userError
exports.systemError = systemError
