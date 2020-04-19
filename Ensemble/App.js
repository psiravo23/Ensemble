import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { SpotifyLoginScreen as SpotifyLoginScreen } from './SpotifyLogin.js'

const Stack = createStackNavigator();

export default class App extends React.Component {
  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator intialRouteName="Login">
          <Stack.Screen name="Login" component={SpotifyLoginScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


/*call get tokens from dashboard with our results
spotify doesnt know where to redirect back to with the results
results undefined because not coming back

or create login route where handle authentication
route to comeback to when results
go back to login with results
pass it to get tokens
*/
