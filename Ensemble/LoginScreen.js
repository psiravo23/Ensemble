import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

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
      <View>
        <Text> Welcome to Ensemble </Text>
        <Text> To get started, login with Spotify </Text>
        <Button
          title="Login with Spotify"
          onPress={this.onClick}
          />
      </View>
    );
  }
}
