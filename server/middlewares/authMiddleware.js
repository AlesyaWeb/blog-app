const jwt = require('jsonwebtoken')
const {AuthenticationError} = require('apollo-server-express')
module.exports = function (req, requireAuth = true, requireAdmin = false) {
    const header = req.req.headers.authorization
    if(header){
        console.log(header)
        const token = req.req.headers.authorization.split(' ')[1]
        console.log(token)
        if(!token){
            throw new AuthenticationError('Unauthorized error')
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        console.log(decoded)
        if(requireAdmin && decoded.role !== 'ADMIN'){
            throw new AuthenticationError('U have no access on this action')
        }
        return decoded
    }
    if(requireAuth){
        throw new AuthenticationError('U must be authorized')
    }
    return null
}
