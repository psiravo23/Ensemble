import React from 'react';
import { encode as btoa } from 'base-64';
import * as AuthSession from 'expo-auth-session';
import {AsyncStorage, Text, View} from 'react-native';

const credentials = {
  clientId: 'd952cfadc4804e58bc051c7a80aa062a',
  clientSecret: '7a555ce02e544391817fab08505a5add',
  redirectUri: 'https://auth.expo.io/@rchakale/Ensemble'
}

const scopes = 'user-library-read playlist-modify-private';
//const scopes = scopesArr.join(' ');

export class SpotifyLoginScreen extends React.Component{

  constructor(props){
    super(props);
    this.setUserData = this.setUserData.bind(this);
    this.getAuthorizationCode = this.getAuthorizationCode.bind(this);
    this.getTokens = this.getTokens.bind(this);
    this.refreshTokens = this.refreshTokens.bind(this);
    this.getUserData = this.getUserData.bind(this);
  };

  async componentDidMount() {
    const tokenExpirationTime = await this.getUserData('expirationTime');
    if (!tokenExpirationTime || new Date().getTime() > tokenExpirationTime) {
      await this.refreshTokens();
    } else {
      this.setState({ accessTokenAvailable: true });
    }
  }

  async setUserData (key, value) {
    try {
      await AsyncStorage.setItem({key, value});
    }
    catch (err){
      console.log(err);
    }
  };

  async getUserData(key) {
    try {
      await AsyncStorage.getItem({key});
    }
    catch (err){
      console.log(err);
    }
  }

  async getAuthorizationCode(){
    try {
      const redirectUrl = AuthSession.getRedirectUrl();
      const result = await AuthSession.startAsync({
        authUrl:
          'https://accounts.spotify.com/authorize' +
          '?response_type=code' +
          '&client_id=' +
          credentials.clientId +
          (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
          '&redirect_uri=' +
          encodeURIComponent(redirectUrl),
      })
    } catch (err) {
      console.error(err)
    }
    return result.params.code
  }

  async getTokens(){
    try {
      const authorizationCode = await this.getAuthorizationCode()
      const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${credsB64}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${
          credentials.redirectUri
        }`,
      });
      const responseJson = await response.json();

      const {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: expiresIn,
      } = responseJson;

      const expirationTime = new Date().getTime() + expiresIn * 1000;
      await this.setUserData('accessToken', accessToken);
      await this.setUserData('refreshToken', refreshToken);
      await this.setUserData('expirationTime', expirationTime);
    } catch (err) {
      console.error(err);
    }
  }

  async refreshTokens(){
    try {
      const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
      const refreshToken = await this.getUserData('refreshToken');
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${credsB64}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
      });
      const responseJson = await response.json();
      if (responseJson.error) {
        await this.getTokens();
      } else {
        const {
          access_token: newAccessToken,
          refresh_token: newRefreshToken,
          expires_in: expiresIn,
        } = responseJson;

        const expirationTime = new Date().getTime() + expiresIn * 1000;
        await this.setUserData('accessToken', newAccessToken);
        if (newRefreshToken) {
          await this.setUserData('refreshToken', newRefreshToken);
        }
        await this.setUserData('expirationTime', expirationTime);
        }
    } catch (err) {
      console.error(err)
    }
  }

  render(){
    return(
      <View>
        <Text> Login </Text>
      </View>
    )
  }

}
