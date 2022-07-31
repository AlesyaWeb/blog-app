import {gql} from "@apollo/react-hooks";

export const GET_SLIDES = gql`
    query getSlides {
        slides {
            img_url
            id
        }
    }
`

export const DELETE_SLIDE = gql`
    mutation deleteSlide($id: ID!){
        deleteSlide(id: $id){
            message
        }
    }
`

export const ADD_SLIDE = gql`
    mutation addSlide($file: Upload!){
        addSlide(file: $file){
            id
        }
    }
`

export const EDIT_SLIDE = gql`
    mutation editSlide(data) {
        editSlide(data){
            slide
        }
    }
`