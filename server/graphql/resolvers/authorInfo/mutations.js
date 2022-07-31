const {AuthorInfo} = require("../../../db/models/models");
const {ForbiddenError} = require('apollo-server-express')
const authMiddleware = require('../../../middlewares/authMiddleware')
const path = require("path");
const uuid = require("uuid");
const fs = require("fs");
const authorInfoMutations = {
    changeAuthorInfo: async (_, {info}, req) => {
        // const user = authMiddleware(req, false, false)
        console.log(info)
        if(info.photo?.file) {
            if(!info.photo.file) throw new ForbiddenError('U need to upload file')
            console.log(info.photo)
            const { filename, mimetype, createReadStream } = await info.photo.file
            const stream = createReadStream()
            const {ext, name} = path.parse(filename)
            const pathName = path.join(__dirname, `../../../uploads/${name + uuid.v4()}${ext}`)
            console.log(pathName)
            await stream.pipe(fs.createWriteStream(pathName))
            const imgUrl = `http://localhost:3007/uploads/${pathName.split('uploads')[1]}`
            await AuthorInfo.update({
                photo: imgUrl
            }, {
                where: {
                    id: 1
                }
            })
        }
        await AuthorInfo.update({
            first_name: info.first_name,
            last_name: info.last_name,
            age: info.age,
            description: info.description
        }, {
            where: {
                id: 1
            }
        })
        const updatedInfo = await AuthorInfo.findOne({
            where: {
                id: 1
            }
        })
        return {
            first_name: updatedInfo.first_name,
            last_name: updatedInfo.last_name,
            age: updatedInfo.age,
            description: updatedInfo.description,
            photo: updatedInfo.photo
        }
    }
}
module.exports = authorInfoMutations