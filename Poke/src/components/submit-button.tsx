import React from 'react';
import {StyleSheet, View, Button} from 'react-native';

export const SubmitButton = () => {
  return (
    <View style={styles.input}>
      <Button title="Entrar" onPress={() => { 
      }}/>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 20,
    marginTop: 30,
  },
});
