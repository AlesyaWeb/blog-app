import React, {useState} from 'react';
import plusIcon from '../../assets/plus-icon.svg'
import styles from './AddPost.module.scss'
import Popup from "../common/Popup/Popup";
import AddPostPopup from "./AddPostPopup/AddPostPopup";
const AddPost = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    return (
        <div>
            <button onClick={()=>setIsPopupOpen(true)} className={styles.addPost_button}>
                New post <img src={plusIcon} alt=""/>
            </button>
            <Popup isActive={isPopupOpen} setActive={setIsPopupOpen}>
                <AddPostPopup />
            </Popup>
        </div>
    );
};

export default AddPost;