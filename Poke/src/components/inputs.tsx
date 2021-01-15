import React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';

interface InputProps {
  name: string;
  text: string;
  isPassword: boolean;
  onTextChange: (text: string) => void;
}

export const Input: React.FC<InputProps> = (props) => {
  return (
    <View style={styles.input}>
      <Text>{props.name}</Text>
      <TextInput
        style={styles.box}
        value={props.text}
        onChangeText={props.onTextChange}
        secureTextEntry={props.isPassword}
      />
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
