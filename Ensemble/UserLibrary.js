import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {CountDown} from 'react-native-countdown-component';
import { Button, Icon } from 'react-native-elements';

import {library} from './library.js'
import {userLibraryStyles} from './styles.js'

const Tab = createBottomTabNavigator();

export class UserLibrary extends React.Component{
  constructor(props){
    super(props);
    var time = this.calcTime(parseInt(this.props.route.params.time));
    var playlistId = this.props.route.params.playlistId;
    this.state = {timerSet:time, playlist: [], playlistId: playlistId};
    this.calcTime = this.calcTime.bind(this);
    this.addSong = this.addSong.bind(this);
    this.sendPlaylist = this.sendPlaylist.bind(this);
  }

  calcTime(time) {
    return time * 1;
  }

  addSong(track) {
    var list = this.state.playlist;
    list.push(track);
    this.setState({playlist: list});
  }

  sendPlaylist(){
    var list = this.state.playlist;
    var id = this.state.playlistId;
    this.props.navigation.navigate('Playlist', {playlist: list, playlistId: id});
  }


  render(){
    return(
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              let type = "material";

              if (route.name === 'Timer'){
                iconName = 'timer';
              }
              else if (route.name === 'Songs' ){
                iconName = 'audiotrack';
              }
              else if (route.name === 'Playlists'){
                iconName = 'playlist-play';
                type = "MaterialCommunityIcons";
              }
              else if (route.name === 'Artists'){
                iconName = 'person';
              }
              else if (route.name === 'Albums'){
                iconName = 'album';
              }
              return <Icon type={type} name={iconName} size={size} color={color}/>;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'blue',
            inactiveTintColor: 'white',
            style: {
              backgroundColor: '#1ED761'
            }}
          }>
          <Tab.Screen name="Timer">
            {props => <Timer {...props} playlist={this.state.playlist} time={this.state.timerSet} sendPlaylist={this.sendPlaylist}/>}
          </Tab.Screen>
          <Tab.Screen name="Songs">
            {props => <Songs {...props} addSong={this.addSong} userSongs={this.props.songs}/>}
          </Tab.Screen>
          <Tab.Screen name="Playlists">
            {props => <Playlists {...props} userPlaylists={this.props.playlists}/>}
          </Tab.Screen>
          <Tab.Screen name="Artists">
            {props => <Artists {...props} userArtists={this.props.artists}/>}
          </Tab.Screen>
          <Tab.Screen name="Albums">
            {props => <Albums {...props} userAlbums={this.props.albums}/>}
          </Tab.Screen>
        </Tab.Navigator>
    );
  }
}

class Timer extends React.Component{
  constructor(props){
    super(props);
    this.state = {time: this.props.time};
  }


  render(){
    return(
      <View style={userLibraryStyles.container}>
        <CountDown
          until={this.state.time}
          onFinish={() => this.props.sendPlaylist()}
          size={30}
          digitStyle={{backgroundColor: '#1ED761'}}
          timeLabelStyle={{color: 'white'}}/>
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
      <View style={userLibraryStyles.container}>
        <ScrollView>
           {
              this.props.userSongs.map((song) => (
                 <View key={song.track.name} style={userLibraryStyles.list}>
                    <Text style={userLibraryStyles.listText}>{song.track.name}</Text>
                    <Button
                      type="clear"
                      onPress={()=> this.props.addSong(song.track)}
                      icon={
                        <Icon type="font-awesome" name="plus-square" color={'#1ED761'}/>
                      }
                    />
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
      <View style={userLibraryStyles.container}>
        <ScrollView>
           {
              this.props.userPlaylists.map((playlist) => (
                 <View key = {playlist.id}  style={userLibraryStyles.list}>
                   <Text style={userLibraryStyles.listText}>{playlist.name}</Text>
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
      <View style={userLibraryStyles.container}>
        <ScrollView>
           {
              this.props.userArtists.map((artist) => (
                 <View key = {artist.name}  style={userLibraryStyles.list}>
                   <Text style={userLibraryStyles.listText}>{artist.name}</Text>
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
      <View style={userLibraryStyles.container}>
        <ScrollView>
           {
              this.props.userAlbums.map((album) => (
                 <View key = {album.added_at}  style={userLibraryStyles.list}>
                   <Text style={userLibraryStyles.listText}>{album.album.name}</Text>
                 </View>
              ))
           }
        </ScrollView>
      </View>
    );
  }
}
