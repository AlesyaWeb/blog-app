const {Post} = require('../../../db/models/models.js')
const {Post_content} = require('../../../db/models/models.js')
const {Comment} = require('../../../db/models/models.js')
const {Like} = require('../../../db/models/models.js')
const postFields = {
    Post:  {
        post_content: async (parent, _) => {
            const postContent = await Post_content.findOne({
                where: {
                    post_id: parent.id
                }
            })
            return postContent
        },
        comments: async (parent, _) => {
            const comments = await Comment.findAll({
                where: {
                    post_id: parent.id
                }
            })
            return comments
        },
        likes: async (parent, _) => {
            console.log(parent.id)
            const likes = await Like.findAll({
                where: {
                    post_id: parent.id
                }
            })
            return likes
        }
    }
}

module.exports = postFields