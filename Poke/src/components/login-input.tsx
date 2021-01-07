import React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';

export const EmailInput = () => {
  return (
    <>
      <View style={styles.input}>
        <Text>E-mail</Text>
        <TextInput style={styles.box} />
      </View>
    </>
  );
};

export const SenhaInput = () => {
  return (
    <>
      <View style={styles.input}>
        <Text>Senha</Text>
        <TextInput style={styles.box} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  box: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#000',
    padding: 10,
  },
  input: {
    margin: 20,
    marginTop: 30,
  },
});
