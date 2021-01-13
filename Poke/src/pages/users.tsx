import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, FlatList, Alert, ActivityIndicator} from 'react-native';
import {ApolloClient, createHttpLink, gql, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Users {
  name: string;
  email: string;
  id: string;
}

interface ItemType {
  item: Users;
}

const httpLink = createHttpLink({
  uri: 'https://tq-template-server-sample.herokuapp.com/graphql',
});

const authLink = setContext(async (_, {headers}) => {
  const token = await AsyncStorage.getItem(`@storage_Key`);
  return {
    headers: {
      ...headers,
      authorization: token ? `${token}` : 'Cristiane',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const queryList = () => {
  return client
    .query({
      query: gql`
        query {
          users(pageInfo: {offset: 0, limit: 20}) {
            nodes {
              id
              name
              email
            }
          }
        }
      `,
    })
    .then((result) => {
      return result.data.users.nodes;
    })
    .catch((err) => {
      Alert.alert(err.message);
      return err;
    });
};

const Users = () => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setLoading] = useState(true);
  async function makeList() {
    const users = await queryList();
    const list = users.map((item: Users) => {
      return {
        name: item.name,
        email: item.email,
        id: item.id,
      };
    });
    console.log(list);
    setUserList(list);
  }

  useEffect(() => {
    makeList().then(() => {
      setLoading(false);
    });
  }, []);

  const renderItem = ({item}: ItemType) => {
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
      {isLoading ? (
        <ActivityIndicator size="large" color="#000000" />
      ) : (
        <FlatList data={userList} renderItem={renderItem} contentContainerStyle={{flexGrow: 1}} />
      )}
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
