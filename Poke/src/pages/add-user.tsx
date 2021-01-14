import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, ScrollView, View, Text, StatusBar, Alert} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {Input} from '../components/inputs';
import {SubmitButton} from '../components/submit-button';
import {addUserValidation} from '../validation';

const AddUser = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setDate] = useState('');
  const [phone, setPhone] = useState('');
  const handleSubmit = async () => {
    const validationError = addUserValidation(email, name, phone, birthDate);
    if (!validationError) {
      Alert.alert('Nice');
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
            <>
              <Text style={styles.simple}>Cadastre um usuário!</Text>
              <Input name={'Nome'} text={name} onTextChange={setName} />
              <Input name={'E-mail'} text={email} onTextChange={setEmail} />
              <Input name={'Celular'} text={phone} onTextChange={setPhone} />
              <Input name={'Data de nascimento'} text={birthDate} onTextChange={setDate} />
              <SubmitButton text={'Cadastre'} onTap={handleSubmit} />
            </>
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

export default AddUser;
