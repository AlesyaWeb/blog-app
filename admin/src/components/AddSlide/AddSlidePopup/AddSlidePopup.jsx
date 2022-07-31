import React from 'react';
import FileInput from "../../common/FileInput/FileInput";
import styles from './AddSlidePopup.module.scss'
import {useState} from "react";
import {gql, useMutation} from "@apollo/client";
import {ADD_SLIDE, GET_SLIDES} from "../../../queries/SliderQueries";

const AddSlidePopup = () => {
    const [uploadImage, setImage] = useState(null)
    const [addSlide] = useMutation(ADD_SLIDE)
    const onAddSubmit = () => {
        addSlide({
            variables: {
                file: uploadImage
            },
            refetchQueries: [{query: GET_SLIDES}]
        })
        setImage(null)
    }
    return (
        <div>
            <FileInput image={uploadImage} setImage={setImage} withImagePreview={true} />
            <button onClick={onAddSubmit} disabled={uploadImage ? false : true} className={styles.addSlideButton} type="submit">Add</button>
        </div>
    );
};

export default AddSlidePopup;