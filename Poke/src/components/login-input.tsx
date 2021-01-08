import React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';

interface InputProps {
  text: string;
  onTextChange: (text: string) => void;
}

export const EmailInput: React.FC<InputProps> = (props) => {
  return (
    <View style={styles.input}>
      <Text>E-mail</Text>
      <TextInput
        style={styles.box}
        value={props.text}
        onChangeText = {props.onTextChange} />
    </View>
  );
};

export const PasswordInput: React.FC<InputProps> = (props) => {
  return (
    <View style={styles.input}>
      <Text>Senha</Text>
      <TextInput 
        style={styles.box} 
        value={props.text}
        onChangeText = {props.onTextChange}
        secureTextEntry={true} />
    </View>
  );
};

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
