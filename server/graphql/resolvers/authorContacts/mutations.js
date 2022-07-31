const {AuthorContacts} = require("../../../db/models/models");
const {ForbiddenError} = require('apollo-server-express')
const authMiddleware = require('../../../middlewares/authMiddleware')
const authorContactsMutations = {
    changeAuthorContacts: async (_, {contacts}, req) => {
        // const user = authMiddleware(req, false, false)
        console.log(contacts)
        await AuthorContacts.update({
            address: contacts.address,
            phone_number: contacts.phone_number,
            email: contacts.email,
            vk: contacts.vk,
            inst: contacts.inst,
            github: contacts.github,
            facebook: contacts.facebook
        }, {
            where: {
                id: 1
            }
        })
        const updatedInfo = await AuthorContacts.findOne({
            where: {
                id: 1
            }
        })
        return {
            address: updatedInfo.address,
            phone_number: updatedInfo.phone_number,
            email: updatedInfo.email,
            vk: updatedInfo.vk,
            inst: updatedInfo.inst,
            github: updatedInfo.github,
            facebook: updatedInfo.facebook
        }
    }
}
module.exports = authorContactsMutations