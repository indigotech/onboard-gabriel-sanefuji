import {ApolloProvider} from '@apollo/client';
import React from 'react';
import {Navigation} from 'react-native-navigation';
import App from '../App';
import {client} from './apollo-client';
import {AddUser} from './pages/add-user';
import Users from './pages/users';

Navigation.registerComponent('Login', () => App);
Navigation.registerComponent('Users', () => Users);
Navigation.registerComponent('Add User', () => {
  return (props) => {
    return (
      <ApolloProvider client={client}>
        <AddUser {...props} />
      </ApolloProvider>
    );
  };
});
