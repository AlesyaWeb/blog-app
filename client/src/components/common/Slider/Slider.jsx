import React from "react"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Scrollbar, A11y, Parallax } from 'swiper'
import 'swiper/css'
import './Slider.css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/parallax'
import 'swiper/css/scrollbar'

const Slider = (props) => {
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
                {props.slides.map((slide, key) => <SwiperSlide key={key}><div className="slider__slide"><img src={slide} className="slider__slide_image"></img></div></SwiperSlide>)}
            </Swiper>
    </div>
    )
}

export default Slider