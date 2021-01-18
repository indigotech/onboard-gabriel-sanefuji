import {gql} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, FlatList, TouchableOpacity, View} from 'react-native';
import {Navigation, NavigationComponentProps} from 'react-native-navigation';
import {client} from '../apollo-client';
import {
  AddButtonStyled,
  ButtonPlusSign,
  ListBackgroundStyled,
  ListBoxStyled,
  ListEmailStyled,
  ListUsernameStyled,
} from '../styles';

interface User {
  name: string;
  email: string;
  id: string;
}

interface ItemType {
  item: User;
}

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
      <TouchableOpacity
        onPress={() => {
          Navigation.push(props.componentId, {
            component: {
              name: 'User details',
              passProps: {
                id: item.id,
              },
            },
          });
        }}>
        <ListBoxStyled>
          <ListUsernameStyled key={item.id}>{item.name}</ListUsernameStyled>
          <ListEmailStyled>{item.email}</ListEmailStyled>
        </ListBoxStyled>
      </TouchableOpacity>
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

  const handlePress = () => {
    Navigation.push(props.componentId, {
      component: {
        name: 'Add User',
      },
    });
  };

  return (
    <ListBackgroundStyled>
      <FlatList
        data={userList}
        renderItem={renderItem}
        contentContainerStyle={{flexGrow: 1}}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.2}
        ListFooterComponent={listFooter}
      />
      <AddButtonStyled onPress={handlePress}>
        <ButtonPlusSign> + </ButtonPlusSign>
      </AddButtonStyled>
    </ListBackgroundStyled>
  );
};

Users.options = {
  topBar: {
    title: {
      text: 'Users',
    },
  },
};

export default Users;
