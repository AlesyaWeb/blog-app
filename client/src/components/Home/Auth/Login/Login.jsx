import React from "react";
import {useForm} from 'react-hook-form'
import Errors from "./Errors";
import './Login.css'
import {gql} from "graphql-tag";
import {useContext, useState} from "react";
import {AuthContext} from "../../../../Context/AuthContext";
import {useMutation} from "@apollo/react-hooks";


const LOGIN_USER = gql`
    mutation Mutation(
        $login: String!,
        $password: String!
    ) {
        signIn(login: $login, password: $password){
            token
            user{
                id
                login
            }
            error
        }
    }
`

const Login = (props) => {
    const context = useContext(AuthContext)
    const [graphqlErrors, setGraphqlErrors] = useState([])
    const {register, handleSubmit, formState: {errors}, reset, getValues} = useForm({
        mode: 'onChange'
    })
    const [loginUser, {loading}] = useMutation(LOGIN_USER, {
        update(proxy, {data: {signIn: userData}}) {
            context.login(userData)
        },
        onError({graphQLErrors}) {
            console.log(graphqlErrors)
            setGraphqlErrors(graphQLErrors)
        },
        variables: {
            "login": getValues("login"),
            "password": getValues("password")
        }
    })
    const onSubmit = (data) => {
        loginUser({
            variables: {
                login: getValues("login"),
                password: getValues("password")
            }
        })
    }
    return props.isActive &&
    <div className="login-home">
        <h3 className="login__title">Login</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="login__form">
            <div className="login__form-email">
                <label className="email__label">Login</label>
                <input {...(register('login', {
                    required: 'login is required',
                }))} className="email__input" type="text" />
            </div>
            <div className="login__form-password">
                <label className="email__label">Password</label>
                <input {...(register('password', {
                    required: 'password is required'
                }))} className="email__input" type="password" />
            </div>
            <Errors errors={errors} authErrors={graphqlErrors} />
            <div className="login__form-button__wrapper">
                <button className="login__form-button">Sign in</button>
            </div>
        </form>
    </div>
}

export default Login