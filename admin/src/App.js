import React, {useEffect} from 'react';
import {useContext} from "react";
import {AuthContext} from "./Context/AuthContext";
import { Route, Routes, useNavigate, Outlet } from "react-router-dom";
import Login from "./components/Login/Login";
import Sidebar from "./components/Sidebar/Sidebar";
import styles from './App.module.scss'
import PostsEditPage from "./Pages/PostsEditPage/PostsEditPage";
import SliderEditPage from "./Pages/SliderEditPage/SliderEditPage";
import InfoEditPage from "./Pages/InfoEditPage/InfoEditPage";
import ContactsEditPage from "./Pages/ContactsEditPage/ContactsEditPage";
const App = () => {
    const context = useContext(AuthContext)
    const {user} = context
    const navigate = useNavigate()
    useEffect(()=>{
        if(!user || user?.role !== 'ADMIN') navigate('/login')
    }, [user])
    return (
        <div className={styles.main_wrapper}>
            <Routes>
                <Route element={<Sidebar context={context} />}>
                    <Route path={"/"} element={<div className={"font-black"}>hello {user?.login}</div>} />
                    <Route path={"posts"} element={<PostsEditPage />} />
                    <Route path={"slider"} element={<SliderEditPage />} />
                    <Route path={"contacts"} element={<ContactsEditPage />} />
                    <Route path={"info"} element={<InfoEditPage />} />
                </Route>
                <Route path="login" element={<Login context={context} />} />
            </Routes>
        </div>
    );
};

export default App;