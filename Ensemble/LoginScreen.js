import React from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button } from 'react-native-elements';

import {loginStyles} from './styles.js';

export class LoginScreen extends React.Component{
  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.props.navigation.navigate('Invite')
  }

  render(){
    return(
      <View style={loginStyles.container}>
        <Text style={loginStyles.title}> Welcome to Ensemble </Text>
        <Text style={loginStyles.subTitle}> To get started, login with Spotify </Text>
        <Button
          title="Login with Spotify"
          onPress={this.onClick}
          />
      </View>
    );
  }
}
