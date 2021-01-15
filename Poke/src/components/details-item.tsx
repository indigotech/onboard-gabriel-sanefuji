import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface DetailsProps {
  name: string;
  content: string;
}

export const ItemDetails: React.FC<DetailsProps> = (props) => {
  return (
    <>
      <View style={styles.line} />
      <View style={styles.box}>
        <Text style={styles.item}> {props.name} </Text>
        <Text style={styles.content}> {props.content} </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    padding: 5,
  },
  item: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 15,
    padding: 5,
  },
  line: {
    borderBottomColor: '#c8cbce',
    borderBottomWidth: 1,
    margin: 10,
    marginLeft: 30,
    marginRight: 30,
  },
});
