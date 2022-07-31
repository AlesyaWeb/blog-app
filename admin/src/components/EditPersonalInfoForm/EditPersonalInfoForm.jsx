import {gql} from "@apollo/react-hooks";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import styles from './EditPersonalInfoForm.module.scss'
import Popup from "../common/Popup/Popup";
import FileInput from "../common/FileInput/FileInput";
import ChangeAuthorPhoto from "../ChangeAuthorPhoto/ChangeAuthorPhoto";
import Errors from "../common/Errors/Errors";
import {GET_INFO, SET_INFO} from "../../queries/InfoQueries";

const EditPersonalInfo = () => {
    const {data, loading} = useQuery(GET_INFO)
    const [avatarImage, setAvatarImage] = useState(null)
    const [isPopupActive, setIsPopupActive] = useState(false)
    const [setInfo, {error}] = useMutation(SET_INFO)
    const {
        reset,
        handleSubmit,
        setValue,
        formState: {isDirty, errors},
        getValues,
        register
    } = useForm({
        mode: "onChange"
    })
    useEffect(()=>{console.log(errors)},[errors])
    useEffect(()=>{
        if(!loading){
            if(data.author_info.photo){
                setAvatarImage(data.author_info.photo)
            }
            //todo замнить на defaultValues
            Object.keys(data.author_info).map((key) => {
                setValue(`${key}`, `${data.author_info[key]}`)
            });
        }
    }, [data])
    const onFormSubmit = (data) => {
        console.log(data)
        setInfo({
            variables: {
                info: {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    age: data.age,
                    description: data.description
                }
            },
            refetchQueries: [{query : GET_INFO}]
        })
    }
    return (
        <form className={styles.infoForm} onSubmit={handleSubmit(onFormSubmit)}>
            <div className={styles.infoForm_avatar_wrapper}>
                <img className={styles.infoForm_avatar} src={avatarImage ? avatarImage : "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"} alt=""/>
                <ChangeAuthorPhoto setImage={setAvatarImage} />
            </div>
            <div className={styles.infoForm__container}>
                <div>
                    <label className={styles.infoForm_label}>first name</label>
                    <input {...register('first_name', {
                        required: "first name is required"
                    })} type="text"/>
                </div>
                <div>
                    <label className={styles.infoForm_label}>last name</label>
                    <input {...register('last_name', {
                        required: "last name is required"
                    })} type="text"/>
                </div>
            </div>
            <label className={styles.infoForm_label}>age</label>
            <input className={styles.infoForm__age} {...register('age', {
                valueAsNumber: true,
                required: "age is required"
            })} type="number"/>
            <label className={styles.infoForm_label}>description</label>
            <textarea className={styles.infoForm__description} {...register('description')} type="text"/>
            <Errors serverErrors={error} validationErrors={errors} />
            <button disabled={!isDirty} className={styles.infoForm__submit} type={"submit"}>Save</button>
        </form>
    );
};

export default EditPersonalInfo;