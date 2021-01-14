import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Alert, ActivityIndicator} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {Input} from './src/components/inputs';
import {SubmitButton} from './src/components/submit-button';
import {validation} from './src/validation';
import {ApolloClient, InMemoryCache, gql} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Navigation, NavigationComponentProps} from 'react-native-navigation';

const client = new ApolloClient({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

// Email: admin@taqtile.com.br
// Password: 1234qwer

const login = (email: string, password: string) => {
  return client
    .mutate({
      mutation: gql`
      mutation {
        login (data:{
          email: "${email}"
          password: "${password}"
        }){
          token
        }
      }
    `,
    })
    .then((result) => {
      const jsonString = JSON.stringify(result);
      const data = JSON.parse(jsonString);
      storeData(data.data.login.token);
      return result;
    })
    .catch((err) => {
      const errorString = JSON.stringify(err);
      const error = JSON.parse(errorString);
      Alert.alert(error.message);
      return null;
    });
};

const storeData = async (value: string) => {
  try {
    await AsyncStorage.setItem('@storage_Key', value);
  } catch (e) {
    Alert.alert(e);
  }
};

const App = (props: NavigationComponentProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const validationError = validation(email, password);
    if (!validationError) {
      setLoading(true);
      if (await login(email, password)) {
        Navigation.push(props.componentId, {
          component: {
            name: 'Users',
          },
        }).then(() => {
          setLoading(false);
        });
      }
    } else {
      Alert.alert(validationError);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <View style={styles.body}>
            {isLoading ? (
              <ActivityIndicator size="large" color="#000000" />
            ) : (
              <>
                <Text style={styles.simple}>Bem vindo(a) à Taqtile!</Text>
                <Input name="E-mail" text={email} onTextChange={setEmail} isPassword={false} />
                <Input name="Senha" text={password} onTextChange={setPassword} isPassword={true} />
                <SubmitButton text={'Entrar'} onTap={handleSubmit} />
              </>
            )}
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
