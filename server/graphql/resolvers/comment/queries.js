const {Comment} = require("../../../db/models/models");
const commentQueries = {
    comments: async () => {
        const comments = Comment.findAll()
        return comments
    },
    comment: async (_, {id}) => {
        const comment = await Comment.findOne({where: {id: id}})
        console.log(comment)
        return comment
    },
}

module.exports = commentQueries