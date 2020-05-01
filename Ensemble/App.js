import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {AsyncStorage} from 'react-native';

import {LoginScreen as LoginScreen} from './LoginScreen.js';
import {InviteScreen as InviteScreen} from './InviteScreen.js';
import {UserLibrary as UserLibrary} from './UserLibrary.js';
import {Playlist  as Playlist} from './Playlist.js';

import {refreshTokens} from './refreshTokens.js'
import {getUserData} from './handleUserData.js'

const Stack = createStackNavigator();

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {userSongs: [], userAlbums: [], userPlaylists: [], userArtists:[]};
    this.setUserSongs = this.setUserSongs.bind(this);
    this.setUserAlbums = this.setUserAlbums.bind(this);
    this.setUserPlaylists = this.setUserPlaylists.bind(this);
    this.setUserArtists = this.setUserArtists.bind(this);
  }

  setUserSongs(songs){
    this.setState({userSongs: songs});
  }

  setUserAlbums(albums){
    this.setState({userAlbums: albums});
  }

  setUserPlaylists(playlist){
    this.setState({userPlaylists: playlist});
  }

  setUserArtists(artists){
    this.setState({userArtists: artists});
  }

  async componentDidMount() {
    const tokenExpirationTime = await getUserData('expirationTime');
    if (!tokenExpirationTime || new Date().getTime() > parseInt(tokenExpirationTime)) {
      await refreshTokens();
    } else {
      this.setState({ accessTokenAvailable: true });
    }

    if (this.state.accessTokenAvailable === true){
      var accessToken = await getUserData('accessToken');
      var songUrl = 'https://api.spotify.com/v1/me/tracks?limit=50';
      await fetch (songUrl, {method: 'GET', headers: {'Authorization': 'Bearer ' + accessToken}})
          .then((res) => res.json())
            .then((json) => {
              this.setUserSongs(json.items)
            })
      var albumUrl = 'https://api.spotify.com/v1/me/albums';
      await fetch (albumUrl, {method: 'GET', headers: {'Authorization': 'Bearer ' + accessToken}})
          .then((res) => res.json())
            .then((json) => {
              this.setUserAlbums(json.items);
            })
      var playlistUrl = 'https://api.spotify.com/v1/me/playlists';
      await fetch (playlistUrl, {method: 'GET', headers: {'Authorization': 'Bearer ' + accessToken}})
          .then((res) => res.json())
            .then((json) => {
              this.setUserPlaylists(json.items);
            })
      var artistsUrl = 'https://api.spotify.com/v1/me/following?type=artist';
      await fetch (artistsUrl, {method: 'GET', headers: {'Authorization': 'Bearer ' + accessToken}})
          .then((res) => res.json())
            .then((json) => {
              this.setUserArtists(json.artists.items);
            })
    }
  //  AsyncStorage.clear();
  }


  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator intialRouteName="Login" screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={LoginScreen}/>
          <Stack.Screen name="Invite" component={InviteScreen}/>
          <Stack.Screen name="UserLibrary">
            {props => <UserLibrary {...props} songs={this.state.userSongs} albums={this.state.userAlbums} playlists={this.state.userPlaylists} artists={this.state.userArtists}/>}
          </Stack.Screen>
          <Stack.Screen name="Playlist" component={Playlist}/>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
