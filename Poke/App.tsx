import {ApolloProvider, gql} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {ActivityIndicator, Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Navigation, NavigationComponentProps} from 'react-native-navigation';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {client} from './src/apollo-client';
import {Input} from './src/components/inputs';
import {SubmitButton} from './src/components/submit-button';
import {emailValidator, lengthValidator, passwordValidator, requiredFieldValidator} from './src/validation';

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
  const emailRequiredError = 'O campo de e-mail deve estar preenchido.';
  const passwordRequiredError = 'O campo de senha deve estar preenchido.';
  const emailError = 'O e-mail foi escrito errado.';
  const passwordLengthError = 'A senha deve ter no mínimo 7 caracteres.';
  const passwordError = 'A senha deve ter no mínimo um caracter e um número.';

  const handleSubmit = async () => {
    if (requiredFieldValidator(email, emailRequiredError)) {
      Alert.alert(emailRequiredError);
    } else if (emailValidator(email, emailError)) {
      Alert.alert(emailError);
    } else if (requiredFieldValidator(password, passwordRequiredError)) {
      Alert.alert(passwordRequiredError);
    } else if (lengthValidator(password, passwordLengthError, 7)) {
      Alert.alert(passwordLengthError);
    } else if (passwordValidator(password, passwordError)) {
      Alert.alert(passwordError);
    } else {
      setLoading(true);
      if (await login(email, password)) {
        Navigation.push(props.componentId, {
          component: {
            name: 'Users',
          },
        })
          .then(() => {
            setLoading(false);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
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
