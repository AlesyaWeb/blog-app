import {useQuery} from "@apollo/react-hooks";
import {gql} from "@apollo/react-hooks";
import styles from './InfoEditPage.module.scss'
import EditPersonalInfoForm from "../../components/EditPersonalInfoForm/EditPersonalInfoForm";
const InfoEditPage = () => {
    return (
        <div>
            <h1 className={styles.infoEditPage_title}>Edit info</h1>
            <EditPersonalInfoForm />
        </div>
    );
};

export default InfoEditPage;