const {User} = require("../../../db/models/models");
const userQueries = {
    users: async () => {
        const users = User.findAll()
        return users
    },
    user: async (_, {id}) => {
        const user = await User.findOne({where: {id: id}})
        return user
    },
}

module.exports = userQueries