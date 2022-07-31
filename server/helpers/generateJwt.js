const jwt = require('jsonwebtoken')

const generateJwt = (id, login, role) => {
    return jwt.sign({id, login, role}, process.env.JWT_SECRET_KEY, {expiresIn: "12h"})
}
module.exports = generateJwt