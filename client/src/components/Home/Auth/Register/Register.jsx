import React, {useContext, useState} from "react";
import {useForm} from 'react-hook-form'
import {AuthContext} from "../../../../Context/AuthContext";
import {gql} from "graphql-tag";
import {useMutation} from "@apollo/react-hooks";
import Errors from "./Errors";
import './Register.css'

const REG_USER = gql`
    mutation Mutation(
        $login: String!,
        $password: String!
    ) {
        signUp(login: $login, password: $password){
            token
            error
            user{
                id
                login
            }
        }
    }
`

const Register = (props) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset, values,
        getValues,
    } = useForm({
        mode: 'onChange'
    })
    const context = useContext(AuthContext)
    const [graphqlErrors, setGraphqlErrors] = useState([])
    const [registerUser, {loading}] = useMutation(REG_USER, {
        update(proxy, {data: {signUp: userData}}) {
            console.log(userData)
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
    const onSubmit = () => {
        registerUser({
            variables: {
                login: getValues("login"),
                password: getValues("password")
            }
        })
        reset()
    }
    return props.isActive &&
    <div className="register-home">
        <h3 className="register__title">Registration</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="register__form">
            <div className="register__form-email">
                <label className="email__label">Login</label>
                <input  {...(register('login', {
                    required: 'login is required',
                }))} className="email__input" type="text" />
            </div>
            <div className="register__form-password">
                <label className="email__label">Password</label>
                <input {...(register('password', {
                    required: 'password is required'
                }))} className="email__input" type="password" />
            </div>
            <Errors errors={errors} authErrors={graphqlErrors} />
            <div className="register__form-button__wrapper">
                <button className="register__form-button">Sign up</button>
            </div>
        </form>
    </div>
}

export default Register