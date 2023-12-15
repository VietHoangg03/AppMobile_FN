import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '@theme/colors';
import {useSelector} from 'react-redux';

const GroupMembers = ({route, navigation}) => {
  const {members} = route.params;
  const users = useSelector(state => state.user.users);

  const memberUsers = useMemo(() => {
    let membersUser = [];
    members.forEach(member => {
      const res = users.find(u => u._id === member.idUser);

      membersUser.push(res);
    });

    return membersUser;
  });

  const renderItem = ({item, index}) => (
    <View style={styles.userCard}>
      <Image
        style={{
          height: 50,
          width: 50,
          borderRadius: 100,
          marginRight: 10,
          marginVertical: 10,
        }}
        source={{uri: item?.avatar}}
      />
      <View>
        <Text style={{fontSize: 18, fontWeight: '500'}}>{item?.fullName}</Text>
        <Text style={{fontSize: 14}}>
          {index === 0
            ? 'Group creator'
            : 'Added by ' + memberUsers[0].fullName}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Chat')}>
          <Entypo name="chevron-small-left" style={styles.back_icon} />
        </TouchableOpacity>

        <Text style={styles.title}>Members</Text>
      </View>

      <FlatList
        style={{marginHorizontal: 20, marginVertical: 20}}
        data={memberUsers}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  header: {
    marginHorizontal: 10,
    flexDirection: 'row',
  },
  back_icon: {
    fontSize: 30,
    color: colors.zblack,
  },
  title: {
    fontSize: 20,
    color: colors.zblack,
    fontWeight: 'bold',
    marginLeft: 130,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.grayMain,
    borderBottomWidth: 2,
  },
});

export default GroupMembers;
