import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
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
        <View>
            <Button
              title="Open in Spotify"
            />
        </View>
    </View>
    );
  }
}
