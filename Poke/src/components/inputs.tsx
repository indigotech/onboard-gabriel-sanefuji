import React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';

interface InputProps {
  name: string;
  text: string;
  onTextChange: (text: string) => void;
}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <View style={styles.input}>
      <Text>{props.name}</Text>
      <TextInput style={styles.box} value={props.text} onChangeText={props.onTextChange} />
    </View>
  );
};

export const PasswordInput: React.FC<InputProps> = (props) => {
  return (
    <View style={styles.input}>
      <Text>Senha</Text>
      <TextInput style={styles.box} value={props.text} onChangeText={props.onTextChange} secureTextEntry={true} />
    </View>
  );
};

// export const NameInput: React.FC<InputProps> = (props) => {
//   return (
//     <View style={styles.input}>
//       <Text>Nome</Text>
//       <TextInput style={styles.box} value={props.text} onChangeText={props.onTextChange} />
//     </View>
//   );
// };

// export const PhoneInput: React.FC<InputProps> = (props) => {
//   return (
//     <View style={styles.input}>
//       <Text>Celular</Text>
//       <TextInput style={styles.box} value={props.text} onChangeText={props.onTextChange} />
//     </View>
//   );
// };

// export const BirthDateInput: React.FC<InputProps> = (props) => {
//   return (
//     <View style={styles.input}>
//       <Text>Data de nascimento</Text>
//       <TextInput style={styles.box} value={props.text} onChangeText={props.onTextChange} />
//     </View>
//   );
// };

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
