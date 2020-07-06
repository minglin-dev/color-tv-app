import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, FlatList, View, Text } from 'react-native';
import { SearchBar, ListItem } from 'react-native-elements';
import Unsplash, {toJson} from 'unsplash-js';
import { UNSPLASH_API_KEY, UNSPLASH_SECRET } from '../constants/Consts';
import { setUsers, setState } from '../redux/actions';

const unsplash = new Unsplash({
    accessKey: UNSPLASH_API_KEY,
    secret: UNSPLASH_SECRET
});

const keyExtractor = (item, index) => `ctv_user${index}`;

const renderUsers = (user, navigation) => {
  return (
  <ListItem
    title={user.name}
    subtitle={user.bio ? user.bio : ''}
    leftAvatar={{ source: { uri: user.profile_image && user.profile_image.small } }}
    bottomDivider
    chevron
    onPress={() => navigation.navigate('userDetailScreen', {user})}
  />
)};


const UserList = ({ navigation }) => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [searchKey, setSearchKey] = useState('');

  const users = useSelector(state => state.UserReducer.users);
  const state = useSelector(state => state.UserReducer.state);

  const renderEmpty = () => {
    return (
      <View>
        <Text>No users found.</Text>
      </View>
    );
  }

  const handleChangeSearchKey = (key) => {
    setSearchKey(key);
    setTotalPage(1);
    setPage(1);
  }

  useEffect(() => {
    const fetchUserList = (param) => {
      dispatch(setState('fetching'));
      try {
        unsplash.search
          .users(param)
          .then(toJson)
          .then(json => {
            dispatch(setUsers(json.results));
            setTotalPage(json.total_page);
          });
      } catch (e) {
        dispatch(setState('error'));
      }
    };

    fetchUserList(searchKey, page);
  }, [searchKey]);

  return (
      <View style={styles.container}>
        {
          state === 'error' ?
          (<Text>Error occured while fetch users.</Text>) :
          (<View>
            <SearchBar
              placeholder="Type User Name"
              lightTheme
              onChangeText={handleChangeSearchKey}
              value={searchKey}
              style={styles.itemContainer}
            />
            <View style={styles.itemContainer}>
              {
                state === 'fetching' ?
                <Text>Fetching users...</Text> :
                <FlatList
                  keyExtractor={keyExtractor}
                  data={users}
                  extraData={users}
                  ListEmptyComponent={renderEmpty}
                  onEndReached={page < totalPage && setPage(page + 1)}
                  renderItem={(user) => renderUsers(user.item, navigation)}
                />
              }
            </View>
          </View>)
        }
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  itemContainer: {
    width: '100%'
  }
});

export default UserList;