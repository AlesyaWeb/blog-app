import React, {useContext, useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {useMutation} from '@apollo/react-hooks'
import {gql} from "@apollo/react-hooks";
import {AuthContext} from "../../Context/AuthContext";
import userIcon from '../../assets/user-icon.png'
import {useNavigate} from "react-router-dom";
import styles from './Login.module.scss'
const LOGIN = gql`
    mutation Login($login: String!, $password: String!) {
        signIn(login: $login, password: $password){
            token
            user{
                id
                login
                role
            }
            error
        }
    }
`
const Login = ({context}) => {
    const navigate = useNavigate()
    const [authErrors, setAuthErrors] = useState([])
    const {user} = context
    useEffect(()=>{
        if(user && authErrors.length <= 0) navigate('/')
    }, [user])
    const [login, {data}] = useMutation(LOGIN, {
        update: (proxy, {data: {signIn: userData}}) => {
            if(userData.user.role !== 'ADMIN'){
                setAuthErrors([{message: "Not admin"}])
                return
            }
            setAuthErrors([])
            context.login(userData)
        },
        onError: ({graphQLErrors}) => {
            setAuthErrors(graphQLErrors)
        }
    })
    const {
        register,
        reset,
        getValues,
        formState: {errors},
        handleSubmit
    } = useForm({
        mode: "onChange"
    })
    const onSubmit = async () => {
        const setLogin = await login({
            variables: {
                login: getValues("login"),
                password: getValues("password")
            }
        })
        reset()
    }
    return (
        <div className={styles.form__wrapper}>
            <form className={styles.login__form} onSubmit={handleSubmit(onSubmit)}>
                <h1 className={styles.form__title}>Login</h1>
                <div>
                    <label className={styles.form__login__label}>login</label>
                    <input placeholder={"login"} className={styles.form__login__input} {...(register('login', {
                        required: "login is required"
                    }))} type="text"/>
                </div>
                <div>
                    <label className={styles.form__password__label}>password</label>
                    <input className={styles.form__password__input} placeholder={"password"} {...(register('password', {
                        required: "password is required"
                    }))} type="password"/>
                </div>
                <button className={styles.form__button}>Login</button>
                {authErrors &&
                    <div>
                        {
                            authErrors?.map((error, key) =>
                                <div className={styles.auth_error} key={key}>
                                    <img className={styles.auth_error_icon} src={userIcon} />
                                    {error.message}
                                </div>)
                        }
                    </div>
                }
                {errors.login &&
                    <div className={styles.validation_error}>
                        <span className={styles.validation_error_icon} >!</span>
                        {errors.login?.message}
                    </div>
                }
                {errors.password &&
                    <div className={styles.validation_error}>
                        <span className={styles.validation_error_icon} >!</span>
                        {errors.password?.message}
                    </div>
                }
            </form>
        </div>
    );
};

export default Login;