import React from 'react';
import {StyleSheet, View, Button} from 'react-native';

interface SubmitButtonProps {
  onTap: () => void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  return (
    <View style={styles.input}>
      <Button title="Entrar" onPress={props.onTap} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 20,
    marginTop: 30,
  },
});
