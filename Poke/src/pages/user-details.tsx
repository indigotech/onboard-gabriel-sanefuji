import {gql, useQuery} from '@apollo/client';
import React from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {ItemDetails} from '../components/details-item';

interface UserDetails {
  name: string;
  email: string;
  birthDate: string;
  phone: string;
  id: string;
}

const GET_USER = gql`
  query($id: ID!) {
    user(id: $id) {
      name
      email
      birthDate
      phone
      id
    }
  }
`;

export const UserDetails = (props) => {
  const {loading, error, data} = useQuery<{user: UserDetails}, {id: string}>(GET_USER, {
    variables: {id: props.id},
  });
  if (loading) {
    return <ActivityIndicator size="large" color="#000000" />;
  }
  if (error) {
    return <Text> {error.message} </Text>;
  }
  return (
    <SafeAreaView>
      <View>
        <Text style={styles.name}> {data.user.name} </Text>
        <ItemDetails name="E-mail" content={data.user.email} />
        <ItemDetails name="Data de nascimento" content={data.user.birthDate} />
        <ItemDetails name="Celular" content={data.user.phone} />
        <View style={styles.line} />
      </View>
    </SafeAreaView>
  );
};

UserDetails.options = {
  topBar: {
    title: {
      text: 'User details',
    },
  },
};

const styles = StyleSheet.create({
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 15,
  },
  line: {
    borderBottomColor: '#c8cbce',
    borderBottomWidth: 1,
    margin: 10,
    marginLeft: 30,
    marginRight: 30,
  },
});
