import {gql} from "@apollo/react-hooks";

export const GET_CONTACTS = gql`
    query getContacts{
        author_contacts {
            address
            email
            facebook
            phone_number
            vk
            inst
            github
        }
    }
`
export const SET_CONTACTS = gql`
    mutation setContacts($contacts: authorContactsInput) {
        changeAuthorContacts(contacts: $contacts) {
            phone_number
        }
    }
`