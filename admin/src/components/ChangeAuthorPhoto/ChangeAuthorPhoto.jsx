import {useState} from "react";
import styles from './ChangeAuthorPhoto.module.scss'
import FileInput from "../common/FileInput/FileInput";
import Popup from "../common/Popup/Popup";
import {GET_INFO, SET_INFO} from "../../queries/InfoQueries";
import {useMutation} from "@apollo/react-hooks";
const ChangeAuthorPhoto = () => {
    const [setImage] = useMutation(SET_INFO)
    const [photo, setPhoto] = useState(null)
    const [isPopupOpen, setIsPopupOpen] = useState(false)
    const onChoose = () => {
        setImage({
            variables: {
                info: {
                    photo: photo
                }
            },
            refetchQueries: [{query: GET_INFO}]
        })
    }
    return (
        <div>
            <button className={styles.changeAuthorImgBtn} onClick={()=>setIsPopupOpen(true)} type={"button"}>change photo</button>
            <Popup isActive={isPopupOpen} setActive={setIsPopupOpen}>
                <FileInput image={photo} setImage={setPhoto} withImagePreview />
                <button disabled={photo ? false : true} className={styles.chooseAuthorImgBtn} onClick={onChoose} type={"button"}>choose</button>
            </Popup>
        </div>
    );
};

export default ChangeAuthorPhoto;