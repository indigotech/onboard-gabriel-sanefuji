import {gql} from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {ActivityIndicator, Alert, SafeAreaView, StatusBar} from 'react-native';
import {Navigation, NavigationComponentProps} from 'react-native-navigation';
import {client} from './src/apollo-client';
import {Input} from './src/components/inputs';
import {SubmitButton} from './src/components/submit-button';
import {emailValidator, lengthValidator, passwordValidator, requiredFieldValidator} from './src/validation';
import {BackgroungStyled, ScrollStyled, Title} from './src/styles';

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
        <ScrollStyled contentInsetAdjustmentBehavior="automatic">
          <BackgroungStyled>
            {isLoading ? (
              <ActivityIndicator size="large" color="#000000" />
            ) : (
              <>
                <Title>Bem vindo(a) à Taqtile!</Title>
                <Input name="E-mail" text={email} onTextChange={setEmail} />
                <Input name="Senha" text={password} onTextChange={setPassword} isPassword={true} />
                <SubmitButton text={'Entrar'} onTap={handleSubmit} />
              </>
            )}
          </BackgroungStyled>
        </ScrollStyled>
      </SafeAreaView>
    </>
  );
};

export default App;
