const {User} = require('../../../db/models/models.js')
const bcrypt = require('bcrypt')
const generateJwt = require('../../../helpers/generateJwt')
const authMiddleware = require('../../../middlewares/authMiddleware')
const {AuthenticationError} = require('apollo-server-express')
const userMutations = {
    signUp: async (_, {login, password}, req) => {
        console.log(req)
        const candidate = await User.findOne({
            where: {
                login: login
            }
        })
        console.log(candidate)
        if(candidate) throw new AuthenticationError('This login is already been used')
        const hashPassword = await bcrypt.hash(password, 5)
        console.log(hashPassword)
        const user = await User.create({login, password: hashPassword})
        const token = generateJwt(user.id, user.login, user.role)
        return {
            token,
            login: user.login,
            user: user
        }
    },
    signIn: async (_, {login, password}, req) => {
        // const isAuth = authMiddleware(req, true, false)
        const user = await User.findOne({
            where: {
                login: login
            }
        })
        if(!user){
            throw new AuthenticationError("user was not found")
        }
        const comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            throw new AuthenticationError("incorrect password")
        }
        const token = generateJwt(user.id, user.login, user.role)
        return {
            token,
            login: user.login,
            user: user
        }
    },
    check: async (_, {login, password}, req) => {
        const user = authMiddleware(req)
        if(!user) return {error: "Unauthorized error"}
        const token = generateJwt(user.id, user.login, user.role)
        return {
            token
        }
    }
}
module.exports = userMutations