import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
 
const cache = new InMemoryCache();

const {
    REACT_APP_API_URL,
    REACT_APP_API_KEY,
} = process.env;

const httpLink = createHttpLink({
    uri: REACT_APP_API_URL,
  });
  
const link = setContext((_, { headers }) => {
return {
    headers: {
    ...headers,
    'fujix-api-key': REACT_APP_API_KEY,
    }
}
});

const client = new ApolloClient({
    link: link.concat(httpLink),
    cache
});

export default client;