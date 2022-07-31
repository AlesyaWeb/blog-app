const {User} = require('../../../db/models/models.js')
const {Like} = require("../../../db/models/models.js")
const {Post} = require('../../../db/models/models.js')
const {ForbiddenError} = require('apollo-server-express')
const authMiddleware = require("../../../middlewares/authMiddleware");
const likeMutations = {
    addLike: async (_, {post_id}, req) => {
        const user = authMiddleware(req, true, false)
        const post = await Post.findOne({
            where: {
                id: post_id
            }
        })

        const userLike = await Like.findOne({
            where: {
                author_id: user.id,
                post_id: post_id
            }
        })
        console.log(userLike)
        if(userLike) throw new ForbiddenError('u already liked this post')

        const like = await Like.create({author_id: user.id, post_id: post_id})
        return{
            author_id: like.author_id,
            post_id: like.post_id,
            id: like.id
        }
    },
    deleteLike: async (_, {post_id}, req) => {
        console.log('hello')
        const user = authMiddleware(req, true, false)
        const post = await Post.findOne({
            where: {
                id: post_id
            }
        })

        const userLike = await Like.findOne({
            where: {
                author_id: user.id,
                post_id: post_id
            }
        })

        if(!userLike) throw new ForbiddenError('u do not liked this post')

        const deleteLike = await Like.destroy({
            where:{
                author_id: user.id,
                post_id: post_id
            }
        })
        return{
            message: "Successfully deleted"
        }
    }
}
module.exports = likeMutations