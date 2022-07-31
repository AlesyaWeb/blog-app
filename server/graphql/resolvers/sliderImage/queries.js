const {User, SliderImage} = require("../../../db/models/models")
const {Post} = require('../../../db/models/models.js')
const authMiddleware = require('../../../middlewares/authMiddleware')
const sliderImageQueries = {
    slides: async (_, req, parent) => {
        const slides = SliderImage.findAll()
        return slides
    },
    slide: async (_, {id}, parent) => {
        const slide = SliderImage.findOne({
            where: {
                id: id
            }
        })
        return slide
    }
}

module.exports = sliderImageQueries