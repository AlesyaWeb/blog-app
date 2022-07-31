import React from 'react';
import styles from './Popup.module.scss'
const Popup = ({ isActive, setActive, children }) => {
    return (
        <div className={isActive ? styles.modal + ' ' + styles.active : styles.modal } onClick={()=>{setActive(false)}}>
            <div className={styles.modal_content} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Popup;