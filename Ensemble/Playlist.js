import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Button, Icon } from 'react-native-elements';

import {playlistStyles} from './styles.js';

export class Playlist extends React.Component{
  constructor(props){
    super(props);
    var list = this.props.route.params.playlist
    this.state = {genPlaylist: list}
  }

  render(){
    return(
      <View style={playlistStyles.container}>
          <View>
            <Text style={playlistStyles.title}> Your Ensemble Playlist </Text>
            <ScrollView>
               {
                  this.state.genPlaylist.map((item) => (
                     <View key = {item.id}  style={playlistStyles.list}>
                          <Text style={playlistStyles.listText}>{item.song}</Text>
                     </View>
                  ))
               }
            </ScrollView>
          </View>
        <View style={playlistStyles.button}>
            <Button
              title="Open in Spotify"
              buttonStyle={{backgroundColor:'#1ED761'}}
            />
        </View>
    </View>
    );
  }
}
