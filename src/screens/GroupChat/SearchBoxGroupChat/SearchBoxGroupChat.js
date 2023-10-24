import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
} from 'react-native';
import {images} from '@images';
import {colors} from '@theme/colors';
import {styles} from './SearchBoxGroupChat.style';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SearchBoxGroupChat = ({userStore, addPreMember}) => {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const debounceSearch = useRef(null);

  useEffect(() => {
    if (!search) {
      setUsers([]);
    } else {
      if (debounceSearch.current) {
        clearTimeout(debounceSearch.current);
      }
      debounceSearch.current = setTimeout(() => {
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

  const UserCard = ({user}) => {
    return (
      <TouchableOpacity
        style={{
          backgroundColor: colors.white,
          paddingVertical: 15,
          paddingHorizontal: 15,
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => {
          setSearch('');
          addPreMember(user);
        }}>
        <Image
          source={{uri: user.avatar}}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: 500,
          }}
        />

        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: colors.gray02,
            marginLeft: 5,
            width: '85%',
            position: 'relative',
            top: 8,
            paddingBottom: 12,
            borderBottomColor: colors.grayMain,
            borderBottomWidth: 1,
          }}>
          {user.fullName}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}) => <UserCard user={item} setSearch={setSearch} />;

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <Image style={styles.searchIcon} source={images.search} />
        <TextInput
          placeholderTextColor={colors.gray02}
          value={search}
          style={styles.searchInput}
          onChangeText={text => setSearch(text)}
          placeholder="Search"
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
            height: 500,
          }}>
          <FlatList
            style={{height: 500}}
            data={users}
            renderItem={renderItem}
            keyExtractor={item => item._id}
          />
        </View>
      )}
    </View>
  );
};

export default SearchBoxGroupChat;
