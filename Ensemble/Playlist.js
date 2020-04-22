import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

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
        <ScrollView>
           {
              this.state.genPlaylist.map((item) => (
                 <View key = {item.id}  style={playlistStyles.list}>
                      <Text>{item.song}</Text>
                 </View>
              ))
           }
        </ScrollView>
      </View>
    );
  }
}
