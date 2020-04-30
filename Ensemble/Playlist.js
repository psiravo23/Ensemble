import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Button, Icon } from 'react-native-elements';

import {playlistStyles} from './styles.js';
import {getUserData} from './handleUserData.js';

export class Playlist extends React.Component{
  constructor(props){
    super(props);
    var list = this.props.route.params.playlist;
    var id = this.props.route.params.playlistId;
    this.state = {genPlaylist: list, finalPlaylist: [], playlistId: id};
    this.openSpotify = this.openSpotify.bind(this);
  }

  async componentDidMount () {
    var accessToken = await getUserData('accessToken');
    var uri =[];
    this.state.genPlaylist.map((song) => {
      uri.push(song.uri);
    });

    var playlistId = this.state.playlistId;
    var genPlaylistUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
    await fetch(genPlaylistUrl, {method: 'POST', headers: {'Authorization': 'Bearer ' + accessToken, 'Content-Type': 'application/json'}, body: JSON.stringify({'uris': uri})});
  }

  async openSpotify (){
    var playlistId = this.state.playlistId;
    var url = `spotify://playlist/${playlistId}`;
    await Linking.openURL(url);
  }

  render(){
    return(
      <View style={playlistStyles.container}>
          <View>
            <Text style={playlistStyles.title}> Your Ensemble Playlist </Text>
            <ScrollView>
               {
                  this.state.genPlaylist.map((song) => (
                     <View key={song.name}  style={playlistStyles.list}>
                          <Text style={playlistStyles.listText}>{song.name}</Text>
                     </View>
                  ))
               }
            </ScrollView>
          </View>
        <View style={playlistStyles.button}>
            <Button
              title="Open in Spotify"
              buttonStyle={{backgroundColor:'#1ED761'}}
              onPress={this.openSpotify}
            />
        </View>
    </View>
    );
  }
}
