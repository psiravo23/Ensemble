import React from 'react';
import * as AuthSession from 'expo-auth-session';
import {AsyncStorage, Text, View, Button} from 'react-native';

import {getTokens} from './getTokens.js';
import {refreshTokens} from './refreshTokens.js';
import {getAuthorizationCode} from './getAuthorizationCode.js';
import {secrets} from './secrets.js';


export class SpotifyLoginScreen extends React.Component{

  constructor(props){
    super(props);
    this.state = {accessTokenAvailable: false};

  };

  /*async componentDidMount() {
    const tokenExpirationTime = await this.getUserData('expirationTime');
    if (!tokenExpirationTime || new Date().getTime() > tokenExpirationTime) {
      await this.refreshTokens();
    } else {
      this.setState({ accessTokenAvailable: true });
    }
  }*/

  _onPress = () =>{
    const result = getAuthorizationCode();
    console.log(result);
    //refreshTokens(result);
  }

  _onPressToken = (result) =>{

  }

  render(){
    return(
      <View>
        <Text> Login to Spotify </Text>
        <Button
          title="Get Result"
          onPress={this._onPress}/>
        <Button
          title="Get Token"
          onPress={this._onPressToken}/>
      </View>
    )
  }


}
