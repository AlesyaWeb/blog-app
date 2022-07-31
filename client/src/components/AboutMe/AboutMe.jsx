import React from 'react';
import './AboutMe.css'
import {gql} from "graphql-tag";
import {useQuery} from "@apollo/client";
const GET_INFO = gql`
    query Author_info {
        author_info {
            first_name
            last_name
            age
            description
            photo
        }
    }
`
const AboutMe = () => {
    const {data, loading} = useQuery(GET_INFO)
    const aboutMe = data?.author_info
    return (
        <>
            {!loading &&
                <div className={"about__me"}>
                    <div className={"container"}>
                        <h1 className={"about__me-title"}>About me</h1>
                        <div className={"about__me-name"}>{`${aboutMe.first_name} ${aboutMe.last_name}`}</div>
                        <img width={120} className={"about__me-photo"} src={aboutMe.photo} alt=""/>
                        <p className={"about__me-description"}>{aboutMe.description}</p>
                    </div>
                </div>
            }
        </>
    );
};

export default AboutMe;