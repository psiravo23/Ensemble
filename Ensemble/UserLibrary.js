import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableHighlight } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import {CountDown} from 'react-native-countdown-component';
import { Button, Icon } from 'react-native-elements';

import {library} from './library.js'
import {userLibraryStyles} from './styles.js'
import {getUserData} from './handleUserData.js'


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


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
    return time * 60;
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
            {props => <Playlists {...props} addSong={this.addSong} userPlaylists={this.props.playlists}/>}
          </Tab.Screen>
          <Tab.Screen name="Artists">
            {props => <Artists {...props} addSong={this.addSong} userArtists={this.props.artists}/>}
          </Tab.Screen>
          <Tab.Screen name="Albums">
            {props => <Albums {...props} addSong={this.addSong} userAlbums={this.props.albums}/>}
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
    console.log(this.props.userSongs);
  }

  render(){
    return(
      <View style={userLibraryStyles.container}>
        <ScrollView>
           {
              this.props.userSongs.map((song) => (
                 <View key={song.track.uri} style={userLibraryStyles.list}>
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
      this.state = {playlistId: ''};
      this.addSong = this.addSong.bind(this);
      this.getPlaylist = this.getPlaylist.bind(this);
  }

  addSong(song){
    this.props.addSong(song);
  }

  getPlaylist(playlistId){
    this.setState({playlistId: playlistId});
    this.props.navigation.navigate('PlaylistSongs');
  }

  render(){
    return(
      <Stack.Navigator initialRouteName="ListPlaylists" screenOptions={{headerShown: false}}>
        <Stack.Screen name="ListPlaylists">
          {props => <ListPlaylists {...props} userPlaylists={this.props.userPlaylists} getPlaylist={this.getPlaylist}/>}
        </Stack.Screen>
        <Stack.Screen name="PlaylistSongs">
          {props => <PlaylistSongs {...props} addSong={this.addSong} playlistId={this.state.playlistId}/>}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }
}

class ListPlaylists extends React.Component{
  render(){
    return(
      <View style={userLibraryStyles.container}>
        <ScrollView>
           {
              this.props.userPlaylists.map((playlist) => (
                 <View key = {playlist.id}  style={userLibraryStyles.list}>
                   <Text style={userLibraryStyles.listText}>{playlist.name}</Text>
                   <Button
                     type="clear"
                     onPress={()=> this.props.getPlaylist(playlist.id)}
                     icon={
                       <Icon type="font-awesome" name="chevron-circle-right" color={'#1ED761'}/>
                     }
                   />
                 </View>
              ))
           }
        </ScrollView>
      </View>
    )
  }
}

class PlaylistSongs extends React.Component{

  constructor(props){
    super(props);
    this.state=({playlistId: this.props.playlistId, playlist: []});
    this.fetchPlaylist = this.fetchPlaylist.bind(this);
  }

  componentDidMount(){
    this.fetchPlaylist();
  }

  async fetchPlaylist(){
    var accessToken = await getUserData('accessToken');
    var playlistId = this.state.playlistId;
    var playlistUrl = `https://api.spotify.com/v1/playlists/${playlistId}`;
    await fetch(playlistUrl, {method: 'GET', headers: {'Authorization': 'Bearer ' + accessToken}})
      .then((res) => res.json())
        .then((json) => {
          this.setState({playlist: json.tracks.items})
        })
  }

  render(){
    return(
      <View style={userLibraryStyles.container}>
        <ScrollView>
           {
              this.state.playlist.map((song) => (
                 <View key={song.track.uri} style={userLibraryStyles.list}>
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
    )
  }
}


class Artists extends React.Component{

  constructor(props) {
    super(props);
    this.state=({artistId: ''})
    this.getArtistId = this.getArtistId.bind(this);
    this.addSong = this.addSong.bind(this);
  }

  addSong(song){
    this.props.addSong(song);
  }

  getArtistId(artistId){
    this.setState({artistId: artistId});
    this.props.navigation.navigate('ArtistSongs');
  }

  render(){
    return(
      <Stack.Navigator initialRouteName="ListArtists" screenOptions={{headerShown: false}}>
        <Stack.Screen name="ListArtists">
          {props => <ListArtists {...props} userArtists={this.props.userArtists} getArtistId={this.getArtistId}/>}
        </Stack.Screen>
        <Stack.Screen name="ArtistSongs">
          {props => <ArtistSongs {...props} addSong={this.addSong} artistId={this.state.artistId}/>}
        </Stack.Screen>
      </Stack.Navigator>

    );
  }
}

class ListArtists extends React.Component{
  render(){
    return(
      <View style={userLibraryStyles.container}>
        <ScrollView>
           {
              this.props.userArtists.map((artist) => (
                 <View key = {artist.id}  style={userLibraryStyles.list}>
                   <Text style={userLibraryStyles.listText}>{artist.name}</Text>
                   <Button
                     type="clear"
                     onPress={()=> this.props.getArtistId(artist.id)}
                     icon={
                       <Icon type="font-awesome" name="chevron-circle-right" color={'#1ED761'}/>
                     }
                   />
                 </View>
              ))
           }
        </ScrollView>
      </View>
    )
  }
}

class ArtistSongs extends React.Component{
  constructor(props){
    super(props);
    this.state=({artistId: this.props.artistId, songs: []});
    this.fetchSongs=this.fetchSongs.bind(this);
  }

  componentDidMount(){
    this.fetchSongs();
  }
  async fetchSongs(){
    var accessToken = await getUserData('accessToken');
    var artistId = this.state.artistId;
    console.log(artistId);
    var artistUrl = `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`;
    await fetch(artistUrl, {method: 'GET', headers: {'Authorization': 'Bearer ' + accessToken}})
      .then((res) => res.json())
        .then((json) => {
          this.setState({songs:json.tracks})
        })
  }


  render(){
    return(
      <View style={userLibraryStyles.container}>
        <ScrollView>
           {
              this.state.songs.map((song) => (
                 <View key={song.uri} style={userLibraryStyles.list}>
                    <Text style={userLibraryStyles.listText}>{song.name}</Text>
                    <Button
                      type="clear"
                      onPress={()=> this.props.addSong(song)}
                      icon={
                        <Icon type="font-awesome" name="plus-square" color={'#1ED761'}/>
                      }
                    />
                 </View>
              ))
           }
        </ScrollView>
       </View>
    )
  }
}

class Albums extends React.Component{

  constructor(props) {
    super(props);
    this.set=({album: ''})
    this.addSong = this.addSong.bind(this);
    this.getAlbum = this.getAlbum.bind(this);
  }

  addSong(song){
    this.props.addSong(song);
  }

  getAlbum(album){
    this.setState({album: album});
    this.props.navigation.navigate('AlbumSongs');
  }

  render(){
    return(
      <Stack.Navigator initialRouteName="ListAlbums" screenOptions={{headerShown: false}}>
        <Stack.Screen name="ListAlbums">
          {props => <ListAlbums {...props} userAlbums={this.props.userAlbums} getAlbum={this.getAlbum}/>}
        </Stack.Screen>
        <Stack.Screen name="AlbumSongs">
          {props => <AlbumSongs {...props} addSong={this.addSong} album={this.state.album}/>}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }
}

class ListAlbums extends React.Component{
  render(){
    return(
      <View style={userLibraryStyles.container}>
        <ScrollView>
           {
              this.props.userAlbums.map((album) => (
                 <View key = {album.id}  style={userLibraryStyles.list}>
                   <Text style={userLibraryStyles.listText}>{album.album.name}</Text>
                   <Button
                     type="clear"
                     onPress={()=> this.props.getAlbum(album.album.tracks.items)}
                     icon={
                       <Icon type="font-awesome" name="chevron-circle-right" color={'#1ED761'}/>
                     }
                   />
                 </View>
              ))
           }
        </ScrollView>
      </View>
    )
  }
}

class AlbumSongs extends React.Component{
  render(){
    return(
      <View style={userLibraryStyles.container}>
        <ScrollView>
           {
              this.props.album.map((song) => (
                 <View key={song.uri} style={userLibraryStyles.list}>
                    <Text style={userLibraryStyles.listText}>{song.name}</Text>
                    <Button
                      type="clear"
                      onPress={()=> this.props.addSong(song)}
                      icon={
                        <Icon type="font-awesome" name="plus-square" color={'#1ED761'}/>
                      }
                    />
                 </View>
              ))
           }
        </ScrollView>
       </View>
    )
  }
}
