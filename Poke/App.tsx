import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Alert} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {EmailInput, PasswordInput} from './src/components/login-input';
import {SubmitButton} from './src/components/submit-button';
import {validation} from './src/validation';

import {ApolloClient, gql, InMemoryCache} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
  cache: new InMemoryCache()
});

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = () => {
    const erro = validation(email, password);
    Alert.alert(erro);
    if(erro === 'Tudo certo'){
      client
      .mutate({
        mutation: gql`
        mutation{
          login(data:{
            email: "${email}"
            password: "${password}"
          }){
            token
          }
        }
      `
      })
      .then(result => console.log(result));
    }
    
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <View style={styles.body}>
            <Text style={styles.simple}>Bem vindo(a) à Taqtile!</Text>
            <EmailInput text={email} onTextChange={setEmail} />
            <PasswordInput text={password} onTextChange={setPassword} />
            <SubmitButton onTap={() => {handleSubmit();}} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
    flex: 1,
    width: '100%',
    height: '100%',
  },
  simple: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
    marginTop: 20,
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
