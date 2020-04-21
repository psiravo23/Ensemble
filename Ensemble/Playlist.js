import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export class Playlist extends React.Component{
  constructor(props){
    super(props);
    var list = this.props.route.params.playlist
    this.state = {genPlaylist: list}
  }
  render(){
    return(
      <Text> {this.state.genPlaylist} </Text>
    );
  }
}
