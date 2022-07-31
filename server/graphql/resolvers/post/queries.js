const {User} = require("../../../db/models/models")
const {Post} = require('../../../db/models/models.js')
const authMiddleware = require('../../../middlewares/authMiddleware')
const postQueries = {
    posts: async (_, req, parent) => {
        const posts = Post.findAll()
        return posts
    },
    Post: async (_, {id}, parent) => {
        const post = await Post.findOne({
            where: {
                id: id
            }
        })
        return post
    }
}

module.exports = postQueries