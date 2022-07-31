import styles from './ContactsEditForm.module.scss'
import fb from '../../assets/fb.svg'
import vk from '../../assets/vk.svg'
import inst from '../../assets/inst.svg'
import gh from '../../assets/gh.svg'
import { gql, useQuery, useMutation} from "@apollo/react-hooks";
import PhoneInput, {isValidPhoneNumber} from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import {useEffect} from "react";
import {useForm, Controller} from "react-hook-form";
import Errors from "../common/Errors/Errors";
import {GET_CONTACTS, SET_CONTACTS} from "../../queries/ContactsQueries";
const isPhoneValid = (value) => {
    const isValid = isValidPhoneNumber(value)
    if(!isValid){
        return "Invalid phone number"
    }
    return true
}
const ContactsEditForm = () => {
    const {data, loading} = useQuery(GET_CONTACTS)
    const [setContacts, {error}] = useMutation(SET_CONTACTS)
    const {
        register,
        setValue,
        handleSubmit,
        control,
        formState: {errors}
    } = useForm({mode: "onChange"})
    useEffect(()=>{
        if(!loading) {
            Object.keys(data.author_contacts).map((key) => {
                setValue(`${key}`, `${data.author_contacts[key]}`)
            });
        }
    },[data])
    const onFormSubmit = (data) => {
        setContacts({
            variables: {
                contacts: {
                    address: data.address,
                    email: data.email,
                    phone_number: data.phone_number,
                    facebook: data.facebook,
                    vk: data.vk,
                    inst: data.inst,
                    github: data.github
                }
            },
            refetchQueries: [{query: GET_CONTACTS}]
        })
    }
    return (
        <form className={styles.editContactsForm} onSubmit={handleSubmit(onFormSubmit)}>
            <div className={styles.editContactsForm_container}>
                <label>address</label>
                <input {...register('address', {required: "address is required"})} type="text"/>
            </div>
            <div className={styles.editContactsForm_container}>
                <label>telephone number</label>
                <div className={styles.phoneInput}>
                    <Controller
                        name="phone_number"
                        control={control}
                        rules={{
                            validate: (value) => isPhoneValid(value),
                            required: "Phone is required"
                        }}
                        render={({ field: { onChange, value } }) => (
                            <PhoneInput
                                value={value}
                                onChange={onChange}
                                id="phone_number"
                            />
                        )}
                    />
                </div>
            </div>
            <div className={styles.editContactsForm_container}>
                <label>email</label>
                <input {...register('email', {required: "email is required"})} type="text"/>
            </div>
            <div className={styles.editContactsForm_socnets}>
                <h2 className={styles.editContactsForm_socnets_title}>Social networks</h2>
                <div className={styles.editContactsForm_container}>
                    <img width={30} src={fb} alt=""/>
                    <input {...register('facebook', {required: "facebook is required"})} type="text"/>
                </div>
                <div className={styles.editContactsForm_container}>
                    <img width={30} src={vk} alt=""/>
                    <input {...register('vk', {required: "vk is required"})} type="text"/>
                </div>
                <div className={styles.editContactsForm_container}>
                    <img width={30} src={inst} alt=""/>
                    <input {...register('inst', {required: "inst is required"})} type="text"/>
                </div>
                <div className={styles.editContactsForm_container}>
                    <img width={30} src={gh} alt=""/>
                    <input {...register('github', {required: "github is required"})} type="text"/>
                </div>
            </div>
            <Errors validationErrors={errors} serverErrors={error} />
            <button className={styles.editContactsForm_submit}>Submit</button>
        </form>
    );
};

export default ContactsEditForm;