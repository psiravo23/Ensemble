import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEBA81'
  },
  title: {
    fontSize: 30
  },
  subTitle: {
    fontSize: 20
  },
});

export const inviteStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEBA81',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20
  },
  textInput: {
    margin: 15,
    height: 40,
    width: 250,
    borderColor: 'black',
    borderWidth: 1,
  }
});

export const userLibraryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEBA81',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 30,
      margin: 2,
      borderColor: '#2a4944',
      borderWidth: 1,
      backgroundColor: '#d2f7f1'
   }
});

export const playlistStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEBA81',
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 30,
      margin: 2,
      borderColor: '#2a4944',
      borderWidth: 1,
      backgroundColor: '#d2f7f1'
   }
});
