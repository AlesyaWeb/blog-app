import React from 'react';
import styles from './ImagePreview.module.scss'
const ImagePreview = ({ image }) => {
    return (
        <div className={styles.imgPreview}>
            {image ? <img className={styles.imgPreview_img} width={60} src={image} alt=""/> :
                <h1 className={styles.imgPreview_text}>Upload image and u will see it here</h1>
            }
        </div>
    );
};

export default ImagePreview;