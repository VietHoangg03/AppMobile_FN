import {StyleSheet} from 'react-native';
import {colors} from '@theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  headerEdit: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    alignItems: 'center',
    position: 'relative',
  },

  headerIcon: {
    fontSize: 24,
    color: colors.blackApp,
  },

  headerText: {
    fontSize: 24,
    marginLeft: 10,
    fontWeight: 'bold',
    color: colors.blackApp,
  },

  saveButton: {
    position: 'absolute',
    right: 13,
  },

  textSaveButton: {
    color: colors.secondColor,
    fontSize: 22,
    fontWeight: '600',
  },

  editContainer: {
    marginHorizontal: 15,
    marginVertical: 20,
    borderBottomWidth: 2,
    borderBottomColor: colors.grayMain,
  },

  typeEditContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  typeEditText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  editText: {
    fontSize: 20,
    color: colors.secondColor,
  },

  profileAvatar: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 200,
  },
  profileWallpaper: {
    width: 345,
    height: 150,
    marginVertical: 20,
    borderRadius: 5,
    alignSelf: 'center',
  },
  textBio: {
    textAlign: 'center',
    fontSize: 20,
    marginVertical: 20,
    color: colors.gray02,
  },
  aboutContainer: {
    marginVertical: 20,
  },
  aboutItem: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  iconAbout: {
    fontSize: 18,
    flex: 1,
  },
  containerText: {
    flex: 10,
  },
  normalText: {
    fontSize: 18,
  },
  boldText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
    alignItems: 'center',
  },
  typeInfo: {
    fontSize: 18,
    fontWeight: '600',
  },
  textInfo: {
    fontSize: 18,
  },

  modalViewBio: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 13,
    maxHeight: 240,
  },

  modalViewInfo: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 13,
    maxHeight: 560,
  },

  modalInput: {
    height: 36,
    width: '93%',
    margin: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray04,
    padding: 10,
    color: '#000',
  },

  modalTypeText: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 20,
    fontWeight: '600',
    color: colors.blackApp,
  },

  containerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 15,
  },
  noteText: {
    marginHorizontal: 10,
    color: colors.gray02,
  },
  button: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.white,
  },
});
