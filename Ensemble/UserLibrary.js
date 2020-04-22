import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {CountDown} from 'react-native-countdown-component';

import {library} from './library.js'
import {styles} from './styles.js'

const Tab = createBottomTabNavigator();

export class UserLibrary extends React.Component{
  constructor(props){
    super(props);
    var time = this.calcTime(parseInt(this.props.route.params.time));
    this.state = {timerSet:time, playlist: [], id: 0};
    this.calcTime = this.calcTime.bind(this);
    this.addSong = this.addSong.bind(this);
    this.sendPlaylist = this.sendPlaylist.bind(this);
  }

  calcTime(time) {
    return time * 1;
  }

  addSong(name) {
    var list = this.state.playlist;
    var tempId = this.state.id + 1;
    var temp = {id:tempId, song:name};
    list.push(temp);
    this.setState({playlist: list, id:tempId});
    console.log(this.state.playlist)
  }

  sendPlaylist(){
    var list = this.state.playlist;
    this.props.navigation.navigate('Playlist', {playlist: list});
  }


  render(){

    return(
        <Tab.Navigator>
          <Tab.Screen name="Your List">
            {props => <YourList {...props} playlist={this.state.playlist} time={this.state.timerSet} sendPlaylist={this.sendPlaylist}/>}
          </Tab.Screen>
          <Tab.Screen name="Songs">
            {props => <Songs {...props} addSong={this.addSong}/>}
          </Tab.Screen>
          <Tab.Screen name="Playlists">
            {props => <Playlists {...props}  />}
          </Tab.Screen>
          <Tab.Screen name="Artists">
            {props => <Artists {...props}  />}
          </Tab.Screen>
          <Tab.Screen name="Albums">
            {props => <Albums {...props}  />}
          </Tab.Screen>
        </Tab.Navigator>
    );
  }
}

class YourList extends React.Component{
  constructor(props){
    super(props);
    console.log(this.props.playlist);
    this.state = {playlist: this.props.playlist, time: this.props.time};
  }


  render(){
    return(
      <View>
        <View>
          <CountDown
            until={this.state.time}
            onFinish={() => this.props.sendPlaylist()}
            size={20}/>
        </View>
        <View>
          <Text> {this.state.playlist} </Text>
        </View>
      </View>
    );
  }
}

class Songs extends React.Component{
  constructor(props) {
    super(props);
  }

  render(){
    return(
      <View>
        <Text> Songs </Text>
        <ScrollView>
           {
              library.songs.map((item, index) => (
                 <View key = {item.id}>
                    <TouchableHighlight onPress={()=> this.props.addSong(item.name)}>
                      <Text>{item.name}</Text>
                    </TouchableHighlight>
                 </View>
              ))
           }
        </ScrollView>
       </View>
    );
  }
}

class Playlists extends React.Component{
  constructor(props) {
      super(props);
  }

  render(){
    return(
      <View>
        <Text> Playlists </Text>
        <ScrollView>
           {
              library.playlists.map((item, index) => (
                 <View key = {item.id}>
                    <Text>{item.name}</Text>
                 </View>
              ))
           }
        </ScrollView>
      </View>

    );
  }
}

class Artists extends React.Component{
  render(){
    return(
      <View>
        <Text> Artists </Text>
        <ScrollView>
           {
              library.artists.map((item, index) => (
                 <View key = {item.id}>
                    <Text>{item.name}</Text>
                 </View>
              ))
           }
        </ScrollView>
      </View>
    );
  }
}

class Albums extends React.Component{
  render(){
    return(
      <View>
        <Text> Albums </Text>
        <ScrollView>
           {
              library.albums.map((item, index) => (
                 <View key = {item.id}>
                    <Text>{item.name}</Text>
                 </View>
              ))
           }
        </ScrollView>
      </View>
    );
  }
}
