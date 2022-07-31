import React, {useState, useEffect} from "react"
import dateFormat, { masks } from "dateformat"
import Slider from "../../Slider/Slider"
import HeartIcon from '../../../../assets/heart-icon.svg'
import HeartIconUnliked from '../../../../assets/heart-icon-unliked.svg'
import CommentsIcon from '../../../../assets/comments-icon.svg'
import CommentsIconActive from '../../../../assets/comments-icon-active.svg'
import {useContext} from "react";
import {AuthContext} from "../../../../Context/AuthContext";
import {useMutation} from "@apollo/react-hooks";
import {gql} from "graphql-tag";
import './Post.css'
import Comment from "./Comment/Comment";
import AddCommentForm from "./Comment/AddCommentForm/AddCommentForm";

const LIKE = gql`
    mutation Like($postId: ID!) {
        addLike(post_id: $postId) {
            author_id
            post_id
            id
        }
    }
`
const UNLIKE = gql`
    mutation Unlike($postId: ID!) {
        deleteLike(post_id: $postId) {
            message
        }
    }
`
const Post = (props) => {
    const authContext = useContext(AuthContext)
    const {user} = authContext
    const [isReadMore, setIsReadMore] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(props.likes.length)
    const [isCommentsOpen, setIsCommentsOpen] = useState(false)
    const [comments, setComments] = useState([...props.comments])
    const [like] = useMutation(LIKE, {
        variables: {
            postId: props.id
        }
    })
    const [unlike] = useMutation(UNLIKE, {
        variables: {
            postId: props.id
        }
    })
    const likeUnlike = async () => {
        if(!user) return false
        if(isLiked) {
            const unliked = await unlike()
            setIsLiked(false)
            setLikesCount(likesCount - 1)
        }
        else {
            const liked = await like()
            setIsLiked(true)
            setLikesCount(likesCount + 1)
        }
    }
    useEffect(()=>{
        const liked = props.likes.find(like => like.author_id === parseInt(user?.id))
        if(liked) setIsLiked(true)
        else setIsLiked(false)
    }, [user])
    useEffect(() => {
        if(props.content.text.length > 350) setIsReadMore(true)
    }, [])
    useEffect(()=>{
        setComments(props.comments)
    },[props.comments])
    return <div className="post">
        <div className="post__inner">
            <div className="post__images">
                <Slider navigation={false}
                        spaceBetween={3}
                        slidesPerView={1}
                        parallax={true}
                        pagination={{ clickable: true }}
                        slides={[props.content.image]}
                />
            </div>
            <h2 className="post__title">{props.content.title}</h2>
            <div className="post__date">{dateFormat(props.date, "dddd, mmmm d, yyyy")}</div>
            <div className="post__text">
                {!isReadMore ? props.content.text : props.content.text.slice(0, 350) + '...'}
            </div>
            {isReadMore && 
                <div className="post__readmore-btn">
                    <span onClick={()=>setIsReadMore(false)}>Read more</span>
                </div>
            }
            <div className="post__feedback">
                <div className="post__feedback-comments" onClick={()=>setIsCommentsOpen(!isCommentsOpen)}>
                    {isCommentsOpen ? <img src={CommentsIconActive} className="feedback-comments__icon" alt="" /> :
                        <img src={CommentsIcon} className="feedback-comments__icon" alt="" />}
                    <div className="feedback-comments__count">{comments.length}</div>
                </div>
                <div className="post__feedback-likes">
                    {
                        isLiked ? <img onClick={likeUnlike} width={24} src={HeartIcon} className="feedback-likes__icon" alt="" /> :
                            <img onClick={likeUnlike} width={24}  src={HeartIconUnliked} className="feedback-likes__icon" alt=""/>
                    }
                    <div className="feedback-likes__count">{likesCount}</div>
                </div>
            </div>
            <div className={"post__comments"}>
                {isCommentsOpen && comments.map((comment, key) => <Comment key={key} user={user} text={comment.text} author={comment.author_id} />)}
            </div>
            {user && <AddCommentForm post_id={props.id} />}
        </div>
    </div>
}

export default Post