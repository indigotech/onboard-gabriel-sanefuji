import React from 'react';
import {SafeAreaView, StyleSheet, View, Text, FlatList} from 'react-native';

const list = [
  {
    name: 'Luiz Higuti',
    email: 'luiz.higuti@taqtile.com.br',
    id: '1',
  },
  {
    name: 'Gabriel Sanefuji',
    email: 'gabriel.sanefuji@taqtile.com.br',
    id: '2',
  },
  {
    name: 'Luiz Higuti',
    email: 'luiz.higuti@taqtile.com.br',
    id: '3',
  },
  {
    name: 'Gabriel Sanefuji',
    email: 'gabriel.sanefuji@taqtile.com.br',
    id: '4',
  },
  {
    name: 'Luiz Higuti',
    email: 'luiz.higuti@taqtile.com.br',
    id: '5',
  },
  {
    name: 'Gabriel Sanefuji',
    email: 'gabriel.sanefuji@taqtile.com.br',
    id: '6',
  },
  {
    name: 'Luiz Higuti',
    email: 'luiz.higuti@taqtile.com.br',
    id: '7',
  },
  {
    name: 'Gabriel Sanefuji',
    email: 'gabriel.sanefuji@taqtile.com.br',
    id: '8',
  },
  {
    name: 'Luiz Higuti',
    email: 'luiz.higuti@taqtile.com.br',
    id: '9',
  },
  {
    name: 'Gabriel Sanefuji',
    email: 'gabriel.sanefuji@taqtile.com.br',
    id: '10',
  },
  {
    name: 'Luiz Higuti',
    email: 'luiz.higuti@taqtile.com.br',
    id: '11',
  },
  {
    name: 'Gabriel Sanefuji',
    email: 'gabriel.sanefuji@taqtile.com.br',
    id: '12',
  },
];

const Users = () => {
  const renderItem = ({item}: any) => {
    return (
      <View style={styles.box}>
        <Text style={styles.name} key={item.id}>
          {item.name}
        </Text>
        <Text style={styles.email}>{item.email}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <FlatList data={list} renderItem={renderItem} contentContainerStyle={{flexGrow: 1}} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#e6eaee',
  },
  name: {
    padding: 5,
    fontWeight: 'bold',
  },
  email: {
    alignItems: 'flex-end',
    left: 5,
  },
  box: {
    borderRadius: 22,
    color: '#000000',
    backgroundColor: '#ffffff',
    borderWidth: 0.5,
    padding: 10,
    margin: 5,
    marginTop: 10,
    flexDirection: 'column',
    shadowRadius: 2,
    shadowOpacity: 0.15,
    shadowOffset: {width: 0, height: 2},
    elevation: 5,
  },
});
export default Users;
