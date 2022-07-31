import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from '@apollo/client/link/context'

const httpLink = createHttpLink({
    uri: "http://localhost:3007/graphql"
})

const authLink = setContext((_, {headers}) => {
    return{
        headers: {
            ...headers,
            Authorization: `Bearer ${localStorage.getItem("token")}` || ""
        }
    }
})

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
})

export default client