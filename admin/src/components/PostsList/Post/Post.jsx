import React, {useState} from 'react';
import {useMutation} from "@apollo/react-hooks";
import dateFormat, { masks } from "dateformat"
import {gql} from "@apollo/react-hooks";
import rb from '../../../assets/recyclebin.svg'
import styles from './Post.module.scss'
import {GET_POSTS, DELETE_POST} from "../../../queries/PostsQueries";

const Post = ({post}) => {
    const [deletePost, {data}] = useMutation(DELETE_POST)
    const onDelete = () => {
        deletePost({
            variables: {
                postId: post.id
            },
            refetchQueries: [{query: GET_POSTS}]
        })
    }
    return (
        <div className={styles.post}>
            <div className={styles.post__id}>{post.id}</div>
            <h3 className={styles.post__title}>{post.post_content.title}</h3>
            <div className={"flex-initial w-52"}>{dateFormat(post.created_at, "isoDate")}</div>
            <button onClick={() => {
                if (window.confirm(`Are you sure you wish to delete post "${post.post_content.title}"?`)) onDelete()
            } } className={styles.deletePost__btn}><img src={rb} alt=""/></button>
        </div>
    );
};

export default Post;