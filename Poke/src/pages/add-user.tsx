import {ApolloProvider, gql, useMutation} from '@apollo/client';
import React, {useState} from 'react';
import {Alert, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
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

export const AddUser = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setDate] = useState('');
  const [phone, setPhone] = useState('');

  const requiredError = 'Todos os campos devem estar preenchidos.';
  const emailError = 'O e-mail foi escrito errado.';
  const phoneLengthError = 'O número do celular deve ter no mínimo 11 dígitos.';
  const dateFormatError = 'A data de nascimento deve possuir o formato AAAA-MM-DD';
  const dateError = 'A data de nascimento possui valores inválidos';

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
      Alert.alert('Nice');
    }
  };

  return (
    <ApolloProvider client={client}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
          <View style={styles.body}>
            <Text style={styles.simple}>Cadastre um usuário!</Text>
            <Input name="Nome" text={name} onTextChange={setName} isPassword={false} />
            <Input name="E-mail" text={email} onTextChange={setEmail} isPassword={false} />
            <Input name="Celular" text={phone} onTextChange={setPhone} isPassword={false} />
            <Input name="Data de nascimento" text={birthDate} onTextChange={setDate} isPassword={false} />
            <SubmitButton text={'Cadastre'} onTap={handleSubmit} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ApolloProvider>
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
