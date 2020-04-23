import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter } from 'react-router-dom';

import Routes from 'src/Routes';

import client from 'src/startup/apollo';

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </ApolloProvider>
);

export default App;
