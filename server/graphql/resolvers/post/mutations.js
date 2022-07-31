const {User} = require('../../../db/models/models.js')
const {Post} = require('../../../db/models/models.js')
const {Post_content} = require('../../../db/models/models.js')
const {Comment} = require('../../../db/models/models.js')
const fs = require('fs')
const uuid = require("uuid");
const {ForbiddenError} = require('apollo-server-express')
const authMiddleware = require('../../../middlewares/authMiddleware')
const path = require("path");
const postMutations = {
    addPost: async (parent, {title, text, file}, req) => {
        const { filename, mimetype, createReadStream } = await file.file
        const stream = createReadStream()
        const {ext, name} = path.parse(filename)
        const pathName = path.join(__dirname, `../../../uploads/${name + uuid.v4()}${ext}`)
        console.log(pathName)
        await stream.pipe(fs.createWriteStream(pathName))
        const imgUrl = `http://localhost:3007/uploads/${pathName.split('uploads')[1]}`
        const isAuth = authMiddleware(req, true, true)
        const date = Date.now()
        const post = await Post.create({created_at: date})
        const post_content = await Post_content.create({post_id: post.id, text, title, image: imgUrl})
        return {
            post,
            post_content
        }
    },
    deletePost: async (_, {id}, req) => {
        const user = authMiddleware(req, true, true)
        const post = await Post.findOne({
            where: {
                id: id
            }
        })
        const deletePost = await Post.destroy({
            where:{
                id: post.id
            }
        })
        const deletePostContent = await Post_content.destroy({
            where:{
                post_id: post.id
            }
        })
        const deleteComments = await Comment.destroy({
            where: {
                post_id: post.id
            }
        })
        return{
            message: "Successfully deleted post"
        }
    }
}
module.exports = postMutations