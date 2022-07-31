import styles from './SliderEditPage.module.scss'
import SliderPreview from "../../components/SliderPreview/SliderPreview";
import AddSlide from "../../components/AddSlide/AddSlide";
const SliderEditPage = () => {
    return (
        <div className={styles.sliderEditPage}>
            <h1 className={styles.sliderEditPage_title}>Slider</h1>
            <SliderPreview />
            <AddSlide />
        </div>
    );
};

export default SliderEditPage;