import React, {useContext, useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {useMutation} from "@apollo/client";
import {gql} from "@apollo/client";
import styles from './AddPostPopup.scss';
import ImagePreview from "../../common/FileInput/ImagePreview/ImagePreview";
import FileInput from "../../common/FileInput/FileInput";
import {GET_POSTS} from "../../../queries/PostsQueries";
import Errors from "../../common/Errors/Errors";
const ADD_POST = gql`
    mutation AddPost($title: String!, $text: String!, $file: Upload!) {
        addPost(title: $title, text: $text, file: $file) {
            post_content {
                image
            }
        }
    }
`
const AddPostPopup = () => {
    // styles doesnt applies if i add them with module.scss thats why im using inline-styles
    const {
        register,
        getValues,
        reset,
        formState: {errors},
        handleSubmit
    } = useForm({
        mode: "onChange"
    })
    const [addPost, {data, error}] = useMutation(ADD_POST)
    const [uploadImage, setImage] = useState(null)
    const [formErrors, setFormErrors] = useState([])
    const addPostSubmit = (data) => {
        if(!uploadImage) {
            setFormErrors([{message: "Image is required"}])
            return false
        }
        addPost({
            variables:{
                title: data.title,
                text: data.content,
                file: uploadImage
            },
            refetchQueries: [{query: GET_POSTS}]
        })
        setImage(null)
        setFormErrors([])
        reset()
    }
    return (
        <form onSubmit={handleSubmit(addPostSubmit)} style={{width: "720px"}} className={"w-full"}>
            <h1 className={"text-3xl font-bold"}>Add Post</h1>
            <label className={"text-xl"}>Post title</label>
            <input className={"w-full bg-slate-100 outline-none rounded border border-blue-400 focus:border-blue-600"}
                   {...register('title', {
                required: "Title is required"
            })} type="text"/>
            <label className={"text-xl"}>Post image</label>
            <FileInput image={uploadImage} setImage={setImage} withImagePreview={true} />
            <label className={"text-xl"}>Post content</label>
            <textarea {...register('content', {
                required: "Content is required"
            })} className={"w-full h-24 resize-none bg-slate-100 outline-none rounded border border-blue-400 focus:border-blue-600"}/>
            <Errors validationErrors={errors} serverErrors={formErrors} />
            <button className={"w-44 h-10 rounded mt-5 bg-blue-400 text-white font-bold hover:bg-blue-600 transition-colors"} type="submit">Add</button>
        </form>
    );
};

export default AddPostPopup;