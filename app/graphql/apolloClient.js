import {ApolloClient, InMemoryCache} from "@apollo/client";

export const client = new ApolloClient({
    uri: 'http://172.17.0.1/graphql',
    cache: new InMemoryCache(),
})

