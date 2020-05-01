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
    backgroundColor: 'black'
  },
  title: {
    fontSize: 30,
    color: 'white'
  },
  subTitle: {
    fontSize: 20,
    color: 'white'
  },
});

export const inviteStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: 'white'
  },
  usernameList:{
    fontSize: 15,
    color: 'white'
  },
  textInput: {
    margin: 15,
    height: 40,
    width: 250,
    borderColor: 'white',
    borderWidth: 1,
    color: 'white',
  }
});

export const userLibraryStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    //alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 45
  },
  list: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      margin: 2,
      borderColor: '#2a4944',
      borderWidth: 1,
      backgroundColor: 'black'
   },
   listText:{
     color: 'white'
   }
});

export const playlistStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    //alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 45
  },
  title: {
    color: 'white',
    fontSize: 30,
    alignItems: 'center',
    padding: 20
  },
  list: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 20,
      margin: 2,
      borderColor: '#2a4944',
      borderWidth: 1,
      backgroundColor: 'black'
   },
   listText:{
     color: 'white'
   },
   button: {
     padding: 20,
     backgroundColor:'#1ED761',
   },
   button2: {
     padding: 20,
     alignItems: 'center',
     position: 'absolute',
     bottom: 0,
   }
});
