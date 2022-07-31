const jwt = require('jsonwebtoken')
module.exports = function (role) {
    return function (req, res, next) {
        if(res.method === 'OPTIONS') {
            console.log('options')
            next()
        }
        try{
            // const token = req.headers.authorization.split(' ')[1]
            const token = req.get('Authorization')
            console.log(token)
            if(!token){
                console.log('no tokens')
                return res.status(401).json({message: "Unauthorized error"})
            }
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            if(decoded){
                console.log(decoded)
                if(decoded.role !== role) {
                    return res.status(403).json({message: "No access for this action"})
                }
            }
            console.log(decoded)
            req.user = decoded
            console.log("decodedSSs")
            next()
        }
        catch (e) {
            console.log(e)
        }
    }
}
