import React, {useEffect, useState} from 'react';
import './Comment.css'
import {useQuery} from "@apollo/react-hooks";
import {gql} from "graphql-tag";
const GET_USER_BY_ID = gql`
    query getUser($userId: ID!) {
        user(id: $userId) {
            login
        }
    }
`
const Comment = (props) => {
    // console.log(props)
    const isOwnComment = props.author == props.user?.id
    const [author, setAuthor] = useState(null)
    const {data, loading, error} = useQuery(GET_USER_BY_ID, {
        variables: {
            "userId": props.author
        },
        onError({graphQLErrors}) {
            console.log(graphQLErrors)
        }
    })
    useEffect(()=>{
        if(!loading){
            setAuthor(data.user.login)
        }
        console.log(author)
    }, [data])
    return (
        <div className={"comments__item"}>
            <div className={"comments__item-top"}>
                <img className={"top-logo"} src="https://st.depositphotos.com/3244893/5106/v/950/depositphotos_51060005-stock-illustration-cute-little-panda-icon.jpg" alt=""/>
                <h3 className={"top-login"}>{author} {isOwnComment && "(You)"}</h3>
            </div>
            <div className={"comments__item-bottom"}>
                <p className={"bottom-text"}>{props.text}</p>
            </div>
        </div>
    );
};

export default Comment;