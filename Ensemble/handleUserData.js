import {AsyncStorage} from 'react-native';

export const setUserData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  }
  catch (err){
    console.log(err);
  }
};

export const getUserData = async (key) =>{
  var response;
  try {
    response = await AsyncStorage.getItem(key);
  }
  catch (err){
    console.log(err);
  }
  return response;
}
