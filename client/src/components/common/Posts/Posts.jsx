import React, {useEffect, useState} from 'react'
import postImage from '../../../assets/wp4922106.webp'
import Post from './Post/Post'
import './Posts.css'
import {gql} from "graphql-tag";
import {useQuery} from "@apollo/client";
import {useContext} from "react";
import {AuthContext} from "../../../Context/AuthContext";
export const GET_POSTS = gql`
    query Posts {
        posts {
            id
            createdAt
            post_content {
                title
                text
                image
            }
            comments {
                id
                text
                author_id
            }
            likes {
                id
                author_id
            }
        }
    }
`

const Posts = (props) => {
    const {data, loading, error} = useQuery(GET_POSTS)
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        if(!loading){
            console.log(data.posts)
            setPosts(data.posts)
            console.log('hpiosdfnosdniofsdiofiosdifbsdbfsd')
        }
    },[data])
    return <div className='posts'>
            <div className='posts__inner'>
                {
                    posts.map((post, key) => <Post key={key} likes={post.likes} comments={post.comments} id={post.id} content={post.post_content} date={post.createdAt} />)
                }
            </div>
    </div>
}


export default Posts