import {gql} from "@apollo/react-hooks";

export const GET_INFO = gql`
    query Author_info {
        author_info {
            first_name
            last_name
            age
            description
            photo
        }
    }
`
export const SET_INFO = gql`
    mutation setInfo($info: authorInfoInput) {
        changeAuthorInfo(info: $info) {
            photo
            description
            age
            last_name
            first_name
        }
    }
`