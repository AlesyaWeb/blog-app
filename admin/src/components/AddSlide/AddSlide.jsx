import styles from './AddSlide.module.scss'
import plusIcon from "../../assets/plus-icon.svg";
import {useState} from "react";
import {useMutation} from "@apollo/client";
import {gql} from "@apollo/client";
import {GET_SLIDES} from "../SliderPreview/SliderPreview";
import Popup from "../common/Popup/Popup";
import AddPostPopup from "../AddPost/AddPostPopup/AddPostPopup";
import AddSlidePopup from "./AddSlidePopup/AddSlidePopup";
const AddSlide = () => {
    const [image, setImage] = useState(null)
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    return (
        <>
            <button onClick={()=>setIsPopupOpen(true)} className={styles.addSlide_button}>
                New slide <img src={plusIcon} alt=""/>
            </button>
            <Popup isActive={isPopupOpen} setActive={setIsPopupOpen}>
                <AddSlidePopup />
            </Popup>
        </>

    );
};

export default AddSlide;