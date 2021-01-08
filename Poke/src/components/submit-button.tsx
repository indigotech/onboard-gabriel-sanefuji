import React from 'react';
import {StyleSheet, View, Button} from 'react-native';

interface SubmitButtonProps {
  onTap: () => void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  return (
<<<<<<< HEAD
    <View style={styles.input}>
      <Button title="Entrar" onPress={props.onTap} />
    </View>
=======
      <View style={styles.input}>
        <Button title="Entrar" onPress={props.onTap}/>
      </View>
>>>>>>> Login validation
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 20,
    marginTop: 30,
  },
});
