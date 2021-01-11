import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Alert} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {EmailInput, PasswordInput} from './src/components/login-input';
import {SubmitButton} from './src/components/submit-button';
import {validation} from './src/validation';
import {ApolloClient, InMemoryCache, gql} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Navigation } from 'react-native-navigation';

const client = new ApolloClient({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
  cache: new InMemoryCache()
});

// Email: admin@taqtile.com.br
// Password: 1234qwer

const login = (email: string, password: string) => {
   client.mutate({
    mutation: gql`
      mutation {
        login (data:{
          email: "${email}"
          password: "${password}"
        }){
          token
        }
      }
    `
  })
  .then((result) => {
    console.log(result)
    const jsonString = JSON.stringify(result);
    const data = JSON.parse(jsonString);
    storeData(data.data.login.token);
  })
  .catch(err => {
    const errorString = JSON.stringify(err)
    const error = JSON.parse(errorString)
    console.log(error)
    Alert.alert(error.message)
  })
}

const storeData = async (value: string) => {
  try {
    await AsyncStorage.setItem('@storage_Key', value)
  } catch (e) {
    Alert.alert(e)
  }
}

const App = (props: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = (props: any) => {
    const validationError = validation(email, password);
    if(validationError === null){
      login(email, password)
      Navigation.push(props.componentId, {
        component: {
          name: 'Main', // Push the screen registered with the 'Settings' key
          options: { // Optional options object to configure the screen
            topBar: {
              title: {
                text: 'Main' // Set the TopBar title of the new Screen
              }
            }
          }
        }
      });
    }
    else{
      Alert.alert(validationError);
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
            <SubmitButton onTap={() => {handleSubmit(props)}} />
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
