import React, {useState} from 'react';
import styles from './PostsList.module.scss'
import Post from "./Post/Post";
const PostsList = ({posts}) => {
    return (
        <>
            <h1 className={styles.posts__list_title}>Posts</h1>
            <div className={styles.posts__list}>
                {
                    posts?.map((post, key) => <Post post={post} key={key} />)
                }
            </div>
        </>
    );
};

export default PostsList;