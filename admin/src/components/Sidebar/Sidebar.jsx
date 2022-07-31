import React from 'react'
import styles from './Sidebar.module.scss'
import { NavLink, Outlet } from "react-router-dom";
const Sidebar = ({context}) => {
    const logOut = () => {
        context.logout()
    }
    return (
        <>
            <aside className={styles.sidebar}>
                <div className={styles.sidebar__wrapper}>
                    <div className="flex items-center justify-center h-20 shadow-md">
                        <h1 className="text-3xl uppercase text-white">Admin</h1>
                    </div>
                    <nav className={styles.sidebar__navigation}>
                        <ul className={styles.sidebar__list}>
                            <li className={styles.sidebar__list_item}>
                                <NavLink className={({ isActive }) =>
                                    (isActive ? styles.sidebar__list_link + ' ' + styles.active
                                        : styles.sidebar__list_link)}
                                      to={"/posts"} >Posts</NavLink>
                            </li>
                            <li className={styles.sidebar__list_item}>
                                <NavLink className={({ isActive }) =>
                                    (isActive ? styles.sidebar__list_link + ' ' + styles.active
                                        : styles.sidebar__list_link)}
                                      to={"/slider"} >Main slider</NavLink>
                            </li>
                            <li className={styles.sidebar__list_item}>
                                <NavLink className={({ isActive }) =>
                                    (isActive ? styles.sidebar__list_link + ' ' + styles.active
                                        : styles.sidebar__list_link)}
                                      to={"/info"} >personal info</NavLink>
                            </li>
                            <li className={styles.sidebar__list_item}>
                                <NavLink className={({ isActive }) =>
                                    (isActive ? styles.sidebar__list_link + ' ' + styles.active
                                        : styles.sidebar__list_link)}
                                      to={"/contacts"} >contacts</NavLink>
                            </li>
                        </ul>
                    </nav>
                    <div className={styles.sidebar__logout}>
                        <button onClick={logOut} className={styles.sidebar__logout_button}>Log out</button>
                    </div>
                </div>
            </aside>
            <div className={styles.content__wrapper}>
                <Outlet />
            </div>
        </>

    );
};

export default Sidebar;