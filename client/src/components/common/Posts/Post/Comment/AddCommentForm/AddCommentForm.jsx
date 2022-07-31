import React from 'react';
import './AddCommentForm.css'
import {useState} from "react";
import {useForm} from "react-hook-form";
import {useMutation} from "@apollo/react-hooks";
import {gql} from "graphql-tag";
import {GET_POSTS} from "../../../Posts";
const ADD_COMMENT = gql`
    mutation addComment($text: String!, $postId: ID!) {
        createComment(text: $text, post_id: $postId) {
            text
            post_id
        }
    }
`
const AddCommentForm = (props) => {
    const {
        register,
        handleSubmit,
        reset,
        values,
        getValues,
        formState: {errors}
    } = useForm({
        mode: "onSubmit"
    })
    const [addComment, {data}] = useMutation(ADD_COMMENT)
    const onSubmit = () => {
        addComment({
            variables: {
                text: getValues("text"),
                postId: props.post_id
            },
            refetchQueries: [{query: GET_POSTS}]
        })
        reset()
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={"add-comment__form"}>
            <label className={"add-comment__label"}>Add comment</label>
            <input {...(register('text', {
                required: 'text is required'
            }))} className={"add-comment__input"} type="text"/>
            <button className={"add-comment__button"}>add</button>
        </form>
    );
};

export default AddCommentForm;