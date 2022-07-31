const {AuthorInfo} = require("../../../db/models/models");
const authorInfoQueries = {
    author_info: async (_, req, parent) => {
        const authorInfo = await AuthorInfo.findOne({
            where: {
                id: 1
            }
        })
        return {
            first_name: authorInfo.first_name,
            last_name: authorInfo.last_name,
            age: authorInfo.age,
            description: authorInfo.description,
            photo: authorInfo.photo
        }
    }
}

module.exports = authorInfoQueries