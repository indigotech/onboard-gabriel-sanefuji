import React from 'react';
import {StyleSheet, View, Button} from 'react-native';

interface SubmitButtonProps {
  text: string;
  onTap: () => void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  return (
    <View style={styles.input}>
      <Button title={props.text} onPress={props.onTap} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 20,
    marginTop: 30,
  },
});
