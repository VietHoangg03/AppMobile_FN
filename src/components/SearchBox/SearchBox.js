import React, {useEffect, useRef, useState} from 'react';
import {View, Image, TextInput, FlatList} from 'react-native';
import {images} from '@images';
import {colors} from '@theme/colors';
import {getDataAPI} from '@utils/fetchData';
import {styles} from './SearchBox.styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserCard from '../UserCard/UserCard';
import {useSelector} from 'react-redux';

const SearchBox = ({userStore, navigation}) => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const debounceSearch = useRef(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (!search) {
      setUsers([]);
    } else {
      if (debounceSearch.current) {
        clearTimeout(debounceSearch.current);
      }
      debounceSearch.current = setTimeout(() => {
        //   // const searchUsers = async () => {
        //   //   try {
        //   //     // setLoad(true);
        //   //     const users = await getDataAPI(
        //   //       `user/search?searchUser=${search}`,
        //   //       auth.token
        //   //     );

        //   //     const res = []
        //   //     usersStore.forEach(u => {
        //   //       const resultSearch = users.data.find(user => user._id === u._id)
        //   //     })

        //   //     setUsers(mapUsers);
        //   //     // setLoad(false);
        //   //   } catch (e) {
        //   //     console.log(e);
        //   //   }
        //   // };
        const res = userStore?.filter(user =>
          user.fullName.toLowerCase().includes(search),
        );

        if (res) {
          setUsers(res);
        }
      }, 250);
    }
  }, [search, userStore]);

  const handleClose = () => {
    setSearch('');
    setUsers([]);
  };

  const renderItem = ({item}) => (
    <UserCard user={item} navigation={navigation} setSearch={setSearch} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image style={styles.searchIcon} source={images.search} />
        <TextInput
          placeholderTextColor={colors.gray02}
          value={search}
          style={styles.searchInput}
          onChangeText={text => setSearch(text)}
          placeholder="Tìm kiếm"
        />
        {users.length > 0 && (
          <Ionicons
            name="close"
            onPress={handleClose}
            style={styles.closeIcon}
          />
        )}
      </View>

      {users.length > 0 && (
        <View
          style={{
            height: 600,
          }}>
          <FlatList
            style={{height: 600}}
            data={users}
            renderItem={renderItem}
            keyExtractor={item => item._id}
          />
        </View>
      )}
    </View>
  );
};

export default SearchBox;
