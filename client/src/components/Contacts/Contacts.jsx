import React, {useEffect} from 'react';
import './Contacts.css'
import vk_icon from '../../assets/vk.svg'
import inst_icon from '../../assets/inst.svg'
import gh_icon from '../../assets/gh.svg'
import fb_icon from '../../assets/fb.svg'
import {gql} from "graphql-tag";
import {useQuery} from "@apollo/client";
const GET_CONTACTS = gql`
    query getContacts{
        author_contacts {
            address
            email
            facebook
            phone_number
            vk
            inst
            github
        }
    }
`
const Contacts = () => {
    const {data, loading} = useQuery(GET_CONTACTS)
    const contacts = data?.author_contacts
    return (
        <>
            {contacts &&
                <div className={"contacts"}>
                    <div className={"container"}>
                        <h1 className={"contacts__title"}>Contacts</h1>
                        <div className={"contacts__item"}><b>Adress:</b><span>{contacts.address}</span></div>
                        <div className={"contacts__item"}><b>Telephone:</b><a href={`tel:${contacts.phone_number}`}><span>{contacts.phone_number}</span></a></div>
                        <div className={"contacts__item"}><b>Email:</b><a href={`mailto:${contacts.email}`}><span>{contacts.email}</span></a></div>
                        <div className={"contacts__socnets"}>
                            <a className={"contacts__socnets-link"} href={contacts.vk}><img className={"contacts__socnets-icon"} src={vk_icon} alt=""/></a>
                            <a className={"contacts__socnets-link"} href={contacts.inst}><img className={"contacts__socnets-icon"} src={inst_icon} alt=""/></a>
                            <a className={"contacts__socnets-link"} href={contacts.github}><img className={"contacts__socnets-icon"} src={gh_icon} alt=""/></a>
                            <a className={"contacts__socnets-link"} href={contacts.facebook}><img className={"contacts__socnets-icon"} src={fb_icon} alt=""/></a>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default Contacts;