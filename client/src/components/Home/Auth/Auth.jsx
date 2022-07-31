import React, {useState, useContext} from 'react';
import Register from "./Register/Register";
import Login from "./Login/Login";
import {useMutation} from "@apollo/react-hooks";
import {gql} from 'graphql-tag'
import {AuthContext} from "../../../Context/AuthContext";
import './Auth.css'
const Auth = () => {
    const authContext = useContext(AuthContext)
    const {user} = authContext
    const [isLogin, setIsLogin] = useState(true)
    const [isRegister, setIsRegister] = useState(false)
    const setLogin = () => {
        setIsLogin(true)
        setIsRegister(false)
    }
    const setRegister = () => {
        setIsLogin(false)
        setIsRegister(true)
    }
    return (
        <div className={"auth_wrapper"}>
            {!user &&
                <div>
                    <Login isActive={isLogin} />
                    <Register isActive={isRegister} />
                    <div className={"buttons"}>
                        <button onClick={setLogin} className={isLogin && "active"}>login</button>
                        <button onClick={setRegister} className={isRegister && "active"}>Registration</button>
                    </div>
                </div>
            }
            {user &&
                <div className={"user_profile"}>
                    U logged in as
                    <img className={"user_profile-avatar"} src={"https://st.depositphotos.com/3244893/5106/v/950/depositphotos_51060005-stock-illustration-cute-little-panda-icon.jpg"} alt=""/>
                    <h3 className={"user_profile-login"}>{user.login}</h3>
                    <button className={"user_profile-button"} onClick={()=>authContext.logout()}>logout</button>
                </div>
            }
        </div>
    );
};

export default Auth;