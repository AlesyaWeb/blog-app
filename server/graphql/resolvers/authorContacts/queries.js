const {AuthorContacts} = require("../../../db/models/models");
const authorContactsQueries = {
    author_contacts: async (_, req, parent) => {
        const authorContacts = await AuthorContacts.findOne({
            where: {
                id: 1
            }
        })
        return {
            address: authorContacts.address,
            phone_number: authorContacts.phone_number,
            email: authorContacts.email,
            vk: authorContacts.vk,
            inst: authorContacts.inst,
            github: authorContacts.github,
            facebook: authorContacts.facebook
        }
    }
}

module.exports = authorContactsQueries