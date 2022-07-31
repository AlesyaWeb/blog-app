const {User, Comment} = require("../../../db/models/models");
const {Like} = require("../../../db/models/models");
const likeQueries = {
    like: async () => {
        const likes = Like.findAll()
        return likes
    },
    likes: async (_, {id}) => {
        const like = await Like.findOne({where: {id: id}})
        return like
    },
}

module.exports = likeQueries