const {SliderImage} = require('../../../db/models/models.js')
const fs = require('fs')
const uuid = require("uuid");
const {ForbiddenError} = require('apollo-server-express')
const authMiddleware = require('../../../middlewares/authMiddleware')
const path = require("path");
const sliderImageMutations = {
    addSlide: async (parent, {file}, req) => {
        const { filename, mimetype, createReadStream } = await file.file
        const stream = createReadStream()
        const {ext, name} = path.parse(filename)
        const pathName = path.join(__dirname, `../../../uploads/${name + uuid.v4()}${ext}`)
        await stream.pipe(fs.createWriteStream(pathName))
        const imgUrl = `http://localhost:3007/uploads/${pathName.split('uploads')[1]}`
        const isAuth = authMiddleware(req, true, true)
        const slide = await SliderImage.create({img_url: imgUrl})
        return {
            id: slide.id,
            img_url: slide.img_url
        }
    },
    deleteSlide: async (_, {id}, req) => {
        const isAuth = authMiddleware(req, true, true)
        const slide = await SliderImage.findOne({
            where: {
                id: id
            }
        })
        const deleteSlide = await SliderImage.destroy({
            where:{
                id: slide?.id
            }
        })
        return{
            message: "Slide was successfully deleted"
        }
    }
}
module.exports = sliderImageMutations