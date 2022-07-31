import styles from './SliderPreview.module.scss'
import Slider from "./Slider/Slider";
import {useEffect, useState} from "react";
import {useQuery} from "@apollo/react-hooks";
import {gql} from "@apollo/react-hooks";
import {GET_SLIDES} from "../../queries/SliderQueries";

const SliderPreview = () => {
    const [slides, setSlides] = useState([])
    const {data, loading} = useQuery(GET_SLIDES)
    useEffect(()=>{
        if(!loading) setSlides(data.slides)
    }, [data])
    return (
        <div className={styles.slider__wrapper}>
            <Slider spaceBetween={30}
                    slidesPerView={1}
                    navigation={true}
                    parallax={true}
                    pagination={true}
                    slides={slides}
            />
        </div>
    );
};

export default SliderPreview;