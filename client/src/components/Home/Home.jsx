import React, {useEffect, useState} from "react"
import Slider from "../common/Slider/Slider"
import sliderImage from "../../assets/wp4922106.webp"
import Posts from '../common/Posts/Posts'
import Login from './Auth/Login/Login'
import './Home.css'
import Auth from "./Auth/Auth";
import {gql} from "graphql-tag";
import {useQuery} from "@apollo/client";
const GET_SLIDES = gql`
    query getSlides {
        slides {
            img_url
            id
        }
    }
`
const Home = (props) => {
    const [slides, setSlides] = useState([])
    const {data, loading} = useQuery(GET_SLIDES)
    useEffect(()=>{
        if(!loading){
            const formattedSlides = data.slides.map(slide => slide.img_url)
            setSlides(formattedSlides)
        }
    }, [data])
    return <div className="Home">
        <div className="home__slider">
            <Slider navigation={true}
                    spaceBetween={50}
                    slidesPerView={1}
                    parallax={true}
                    pagination={{ clickable: true }}
                    slides={slides}
            />
        </div>
            <div className="container">
                <div className="home__content-wrapper">
                        <div className="home__content-main">
                            <Posts />
                        </div>
                        <div className="home__content-right-side">
                            <Auth />
                        </div>
                </div>
            </div>
    </div>
}

export default Home