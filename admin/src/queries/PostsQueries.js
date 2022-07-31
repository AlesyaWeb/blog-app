import {gql} from "@apollo/client";

export const ADD_POST = gql`
    mutation AddPost($title: String!, $text: String!, $file: Upload!) {
        addPost(title: $title, text: $text, file: $file) {
            post_content {
                image
            }
        }
    }
`

export const GET_POSTS = gql`
    query Posts {
        posts {
            id
            createdAt
            post_content {
                title
                text
            }
        }
    }
`

export const DELETE_POST = gql`
    mutation DeletePost($postId: ID!) {
        deletePost(id: $postId) {
            message
        }
    }
`