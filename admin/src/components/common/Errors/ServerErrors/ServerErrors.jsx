import React from 'react';
import styles from './ServerErrors.module.scss'
const ServerErrors = ({ errors }) => {
    return (
        <div>
            {
                errors?.map((error, key) => <div className={styles.errors_item} key={key}>{error.message}</div>)
            }
        </div>
    );
};

export default ServerErrors;