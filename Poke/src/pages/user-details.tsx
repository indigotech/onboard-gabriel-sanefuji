import {gql, useQuery} from '@apollo/client';
import React from 'react';
import {ActivityIndicator, SafeAreaView, Text, View} from 'react-native';
import {ItemDetails} from '../components/details-item';
import {DetailsNameStyled, SeparatorLineStyled} from '../styles';

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
        <DetailsNameStyled> {data.user.name} </DetailsNameStyled>
        <ItemDetails name="E-mail" content={data.user.email} />
        <ItemDetails name="Data de nascimento" content={data.user.birthDate} />
        <ItemDetails name="Celular" content={data.user.phone} />
        <SeparatorLineStyled />
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
