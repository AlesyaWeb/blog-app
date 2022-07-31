import React, {useEffect, useState} from "react"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y, Parallax } from 'swiper'
import 'swiper/css'
import './Slider.module.scss'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/parallax'
import 'swiper/css/scrollbar'
import styles from "./Slider.module.scss";
import rb from "../../../assets/recyclebin.svg";
import {gql, useMutation} from "@apollo/react-hooks";
import {DELETE_SLIDE, GET_SLIDES} from "../../../queries/SliderQueries";

const Slider = (props) => {
    const [deleteSlide] = useMutation(DELETE_SLIDE)
    const onDelete = (id) => {
        console.log(id)
        deleteSlide({
            variables: {
                id: id
            },
            refetchQueries: [{query: GET_SLIDES}]
        })
    }
    return (
        <div className="swiper-wrapper">
            <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y, Parallax]}
            spaceBetween={props.spaceBetween}
            slidesPerView={props.slidesPerView}
            navigation={props.navigation}
            parallax={props.parallax}
            pagination={props.pagination}
            >
                {props.slides?.map((slide, key) => <SwiperSlide key={key}>
                    <div className={styles.slider__slide}>
                        <button onClick={() => {
                            if (window.confirm(`Are you sure you wish to delete this slide?`)) onDelete(slide.id)
                        } } className={styles.deleteSlide__btn}><img src={rb} alt=""/></button>
                        <img src={slide?.img_url} className={styles.slider__slide_image}></img>
                    </div>
                </SwiperSlide>)}
            </Swiper>
    </div>
    )
}

export default Slider