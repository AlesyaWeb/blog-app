import React, {useState} from "react"
import {NavLink} from 'react-router-dom'
import './Header.css'
const Header = (props) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    return <header className="header">
        <div className="header__inner">
            <div className="top__header">
            <div className={isMenuOpen ? "menu-burger__btn active" : "menu-burger__btn"} onClick={()=>setIsMenuOpen(!isMenuOpen)}>
                            <span></span>
            </div>
                <div className="header__logo">
                    <img src="" alt="" />
                </div>
                <h1 className="header__name">PERSONAL BLOG WEB SITE</h1>
                <div className="header__user_cb">
                    <img width={60} className="header__user_cb__image" src="https://st.depositphotos.com/3244893/5106/v/950/depositphotos_51060005-stock-illustration-cute-little-panda-icon.jpg" alt="" />
                    <span className="header__user_cb__arrow"></span>
                </div>
            </div>
            <div className="bottom__header">
                <div className="container">
                    <nav className="menu-burger">
                        <ul className={isMenuOpen ? "header__menu_list active" : "header__menu_list"}>
                            <li className="header__menu_list__item">
                                <NavLink to="home" activeClassName="active" className="header__menu_list__item_link">HOME</NavLink>
                            </li>
                            <li className="header__menu_list__item">
                                <NavLink to="about" activeClassName="active" className="header__menu_list__item_link">ABOUT ME</NavLink>
                            </li>
                            <li className="header__menu_list__item">
                                <NavLink to="contacts" activeClassName="active" className="header__menu_list__item_link">CONTACTS</NavLink>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </header>
}


export default Header