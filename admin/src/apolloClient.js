import {ApolloClient, ApolloLink, createHttpLink, InMemoryCache} from "@apollo/client";
import {createUploadLink} from 'apollo-upload-client'
import {setContext} from '@apollo/client/link/context'
const uploadLink = createUploadLink({ uri: "http://localhost:3007/graphql" });


const authLink = setContext((_, {headers}) => {
    return{
        headers: {
            ...headers,
            Authorization: `Bearer ${localStorage.getItem("token")}` || ""
        }
    }
})

const client = new ApolloClient({
    link: ApolloLink.from([authLink, uploadLink]),
    cache: new InMemoryCache()
})

export default client