import React, {useEffect, useState} from 'react';
import {useQuery} from "@apollo/react-hooks";
import {gql} from "@apollo/react-hooks";
import styles from './PostsEditPage.module.scss'
import AddPost from "../../components/AddPost/AddPost";
import PostsList from "../../components/PostsList/PostsList";
import {GET_POSTS} from "../../queries/PostsQueries";

const PostsEditPage = () => {
    const {data, loading} = useQuery(GET_POSTS)
    const [posts, setPosts] = useState([])
    useEffect(()=>{
      if(!loading) setPosts(data.posts)
    }, [data])
    return (
        <div className={styles.edit_posts}>
            <PostsList posts={posts} />
            <AddPost />
        </div>
    );
};
export default PostsEditPage;