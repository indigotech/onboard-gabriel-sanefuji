import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Text, FlatList, Alert, ActivityIndicator, TouchableOpacity} from 'react-native';
import {ApolloClient, createHttpLink, gql, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Navigation, NavigationComponentProps} from 'react-native-navigation';

interface User {
  name: string;
  email: string;
  id: string;
}

interface ItemType {
  item: User;
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

const queryList = async (offset: number, limit: number): Promise<JSON> => {
  try {
    const result = await client.query({
      query: gql`
        query {
          users(pageInfo: {offset: ${offset}, limit: ${limit}}) {
            nodes {
              id
              name
              email
            }
            pageInfo {
              hasNextPage
            }
          }
        }
      `,
    });
    return result.data.users;
  } catch (err) {
    Alert.alert(err.message);
    return err;
  }
};

const Users = (props: NavigationComponentProps) => {
  const [userList, setUserList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [over, setOver] = useState(false);
  const limit = 20;

  async function fetchList() {
    const users = await queryList(offset, limit);
    const newList = userList.concat(users.nodes);
    setUserList(newList);
    setOver(!users.pageInfo.hasNextPage);
  }

  async function updateOffset() {
    setOffset((prevOffset) => prevOffset + limit);
  }

  useEffect(() => {
    if (!isLoading) {
      setLoading(true);
      fetchList().finally(() => {
        setLoading(false);
      });
    }
  }, [offset]);

  const handleLoadMore = async () => {
    if (!isLoading && !over) {
      await updateOffset();
      setLoading(true);
    }
  };

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

  const listFooter = () => {
    if (!isLoading) {
      return null;
    }
    return (
      <View>
        <ActivityIndicator size="large" color="#000000" />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#000000" />
      ) : (
        <FlatList
          data={userList}
          renderItem={renderItem}
          contentContainerStyle={{flexGrow: 1}}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.2}
          ListFooterComponent={listFooter}
        />
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Navigation.push(props.componentId, {
            component: {
              name: 'Add User',
            },
          });
        }}>
        <Text style={styles.text}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

Users.options = {
  topBar: {
    title: {
      text: 'Users',
    },
  },
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
  button: {
    flex: 1,
    justifyContent: 'center',
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4d4a4a',
    position: 'absolute',
    bottom: 40,
    right: 15,
    shadowRadius: 5,
    shadowOpacity: 0.5,
    shadowOffset: {width: 0, height: 0},
    elevation: 5,
  },
  text: {
    alignSelf: 'center',
    color: '#ffffff',
    fontSize: 30,
  },
});
export default Users;
