import {gql, useMutation} from '@apollo/client';
import React, {useState} from 'react';
import {ActivityIndicator, Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {Navigation, NavigationComponentProps, NavigationFunctionComponent} from 'react-native-navigation';
import {Props} from 'react-native-navigation/lib/dist/adapters/TouchablePreview';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Input} from '../components/inputs';
import {SubmitButton} from '../components/submit-button';
import {
  dateFormatValidator,
  dateValidator,
  emailValidator,
  lengthValidator,
  requiredFieldValidator,
} from '../validation';

interface User {
  id: string;
  name: string;
}

const CREATE_USER = gql`
  mutation($name: String!, $email: String!, $phone: String!, $birthDate: Date!) {
    createUser(data: {name: $name, email: $email, phone: $phone, birthDate: $birthDate, role: user}) {
      id
      name
    }
  }
`;

export const AddUser: NavigationFunctionComponent<Props> = (props: NavigationComponentProps) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setDate] = useState('');
  const [phone, setPhone] = useState('');

  const requiredError = 'Todos os campos devem estar preenchidos.';
  const emailError = 'O e-mail foi escrito errado.';
  const phoneLengthError = 'O número do celular deve ter no mínimo 11 dígitos.';
  const dateFormatError = 'A data de nascimento deve possuir o formato AAAA-MM-DD';
  const dateError = 'A data de nascimento possui valores inválidos';
  const [createUser, {loading}] = useMutation<{createUser: User}>(CREATE_USER, {
    onError(error) {
      Alert.alert(error.message);
    },
    onCompleted() {
      Alert.alert('cadastrado');
      Navigation.pop(props.componentId);
    },
  });

  const handleSubmit = async () => {
    if (requiredFieldValidator(name, requiredError)) {
      Alert.alert(requiredError);
    } else if (requiredFieldValidator(email, requiredError)) {
      Alert.alert(requiredError);
    } else if (emailValidator(email, emailError)) {
      Alert.alert(emailError);
    } else if (requiredFieldValidator(phone, requiredError)) {
      Alert.alert(requiredError);
    } else if (lengthValidator(phone, phoneLengthError, 11)) {
      Alert.alert(phoneLengthError);
    } else if (requiredFieldValidator(birthDate, requiredError)) {
      Alert.alert(requiredError);
    } else if (dateFormatValidator(birthDate, dateFormatError)) {
      Alert.alert(dateFormatError);
    } else if (dateValidator(birthDate)) {
      Alert.alert(dateError);
    } else {
      createUser({variables: {name: name, email: email, phone: phone, birthDate: birthDate}});
      Navigation.pop(props.componentId);
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <View style={styles.body}>
            {loading ? (
              <ActivityIndicator size="large" color="#000000" />
            ) : (
              <>
                <Text style={styles.simple}>Cadastre um usuário!</Text>
                <Input name="Nome" text={name} onTextChange={setName} isPassword={false} />
                <Input name="E-mail" text={email} onTextChange={setEmail} isPassword={false} />
                <Input name="Celular" text={phone} onTextChange={setPhone} isPassword={false} />
                <Input name="Data de nascimento" text={birthDate} onTextChange={setDate} isPassword={false} />
                <SubmitButton text={'Cadastre'} onTap={handleSubmit} />
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

AddUser.options = {
  topBar: {
    title: {
      text: 'Add User',
    },
  },
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
