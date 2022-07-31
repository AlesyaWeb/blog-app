import { ErrorMessage } from "@hookform/error-message";
import styles from './ValidationErrors.module.scss'
const ValidationErrors = ({ errors }) => {
    return (
        <>
            {
                Object.keys(errors)?.map((key) => {
                    return <p key={key} className={styles.errors_item}>{errors[key]?.message}</p>
                })
            }
        </>
    );
};

export default ValidationErrors;