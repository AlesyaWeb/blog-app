const {User} = require('../../../db/models/models.js')
const {Comment} = require('../../../db/models/models.js')
const {ForbiddenError} = require('apollo-server-express')
const authMiddleware = require('../../../middlewares/authMiddleware')
const commentMutations = {
    createComment: async (_, {post_id, text}, req) => {
        const user = authMiddleware(req, true, false)
        const author_id = user.id
        console.log(author_id)
        const comment = await Comment.create({post_id, text, author_id})
        return {
            post_id: comment.post_id,
            text: comment.text,
            author_id: comment.author_id,
            id: comment.id
        }
    },
    deleteComment: async (_, {id}, req) => {
        const user = authMiddleware(req, true, false)
        const comment = await Comment.findOne({
            where: {
                id: id
            }
        })
        if(comment.author_id !== user.id) throw new ForbiddenError('U can delete only ur comments')
        const deleteComment = await Comment.destroy({
            where: {
                id: comment.id
            }
        })
        return {
            message: "Successfully deleted"
        }
    }
}
module.exports = commentMutations