import React, { useContext } from 'react';
import Layout from '../components/Layout';
import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { AuthProvider } from '../context/auth';
import AuthRoute from '../util/AuthRoute';
import { ApolloProvider } from '@apollo/react-hooks';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import Login from '../pages/login';
import Register from '../pages/Signup';
import Link from 'next/link'
import Router  from 'next/router';
import { AuthContext } from '../context/auth';



//import { ApolloLink } from '@apollo/client';



const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');  


  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  };
});


function MyApp({ Component, pageProps }) {

  const uploadLink = createUploadLink({ uri: 'http://localhost:5000/graphql' });

  // const httpLink = createHttpLink({
  //   uri: 'http://localhost:5000/graphql'
  // })

 

  const client = new ApolloClient({
   // link: ApolloLink.from([ httpLink, uploadLink ]),
    link: authLink.concat(uploadLink),
    cache: new InMemoryCache(),    
  });

const { user } = useContext(AuthContext);


  return (
      <AuthProvider>                  
    <ApolloProvider client={client}>
      
    {/* {user ? Router.push('/') : null } */}
          {/* <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/Signup" component={Register} /> */}
      <Layout>
        <Component {...pageProps} />
      </Layout>

    </ApolloProvider>      
      </AuthProvider>
  )
}

export default MyApp;





