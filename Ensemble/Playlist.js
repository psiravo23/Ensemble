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
    this.state = {genPlaylist: list, playlistId: id};
    this.openSpotify = this.openSpotify.bind(this);
    this.randomize = this.randomize.bind(this);
  }

  async componentDidMount () {
    var accessToken = await getUserData('accessToken');
    var randPlaylist = this.state.genPlaylist;
    this.randomize(randPlaylist);

    var uri =[];
    this.state.genPlaylist.map((song) => {
      uri.push(song.uri);
    });

    var playlistId = this.state.playlistId;
    var genPlaylistUrl = `https://api.spotify.com/v1/playlists/${playlistId}/tracks`
    await fetch(genPlaylistUrl, {method: 'POST', headers: {'Authorization': 'Bearer ' + accessToken, 'Content-Type': 'application/json'}, body: JSON.stringify({'uris': uri})});
  }

  randomize(uri){
    for (var x=0; x < uri.length-1; x++){
      var rand = Math.floor(Math.random()*uri.length);
      var temp = uri[x];
      uri[x] = uri[rand];
      uri[rand] = temp;
    }

    this.setState({genPlaylist: uri})
    return uri;
  }

  async openSpotify (){
    var playlistId = this.state.playlistId;
    var url = `spotify://playlist/${playlistId}`;
    await Linking.openURL(url);
  }

  render(){
    return(
      <View style={playlistStyles.container}>
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
        <Button
          title="Open in Spotify"
          buttonStyle={playlistStyles.button}
          onPress={this.openSpotify}
        />
      </View>
    );
  }
}
