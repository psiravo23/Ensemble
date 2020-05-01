import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Button } from 'react-native-elements';

import {inviteStyles} from './styles.js';
import {getUserData} from './handleUserData.js';

export class InviteScreen extends React.Component{

  constructor (props) {
    super(props);
    this.state = {username: '', userList: [], time: '', playlistName: '', playlistId: ''};
    this.onInput = this.onInput.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.handleNoTimeSet = this.handleNoTimeSet.bind(this);
  }

  async handlePress () {
    var timeSet = this.state.time;
    var playlistName = this.state.playlistName;
    if (timeSet === ('')) {
      this.handleNoTimeSet()
    }
    else if (playlistName === ('')){
      alert("Please enter in a playlist name");
    }
    else {
      var accessToken = await getUserData('accessToken');
      var userUrl = 'https://api.spotify.com/v1/me';
      var userId;
      var playlistId;
      await fetch(userUrl, {method: 'GET', headers: {'Authorization': 'Bearer ' + accessToken}})
        .then((res) => res.json())
          .then((json) => {
            userId = json.id;
          })
      var playlistUrl = `https://api.spotify.com/v1/users/${userId}/playlists`;
      await fetch(playlistUrl, {method: 'POST', headers: {'Authorization': 'Bearer ' + accessToken, 'Content-Type': 'application/json'}, body: JSON.stringify({'name': playlistName})})
        .then((res) => res.json())
          .then((json) => {
            playlistId = json.id;
          })
      this.props.navigation.navigate('UserLibrary', {time:timeSet, playlistId: playlistId});
    }
  }

  handleNoTimeSet(){
    alert('Please enter in a time');
  }

  onInput(){
    let username = this.state.username;
    var userList = this.state.userList;
    userList.push(username);
    this.setState({username: '', userList:userList});
  }

  render(){
    return(
      <View style={inviteStyles.container}>
        <ScrollView style={inviteStyles.scroll}>
          <Text style={inviteStyles.title}> Add friends to your Ensemble Group </Text>
          <TextInput
            placeholder="Enter a spotify username"
            style={inviteStyles.textInput}
            onChangeText={(text) => this.setState({username: text})}
            value={this.state.username}
            placeholderTextColor="white"
          />
          <Button title="Add" onPress={this.onInput} buttonStyle={{backgroundColor:'#1ED761'}}/>
          {this.state.userList.map(user => (<Text style={inviteStyles.usernameList}> {user} </Text>))}
          <Text style={inviteStyles.title}> Enter time limit in minutes </Text>
          <TextInput
            style={inviteStyles.textInput}
            onChangeText={(text) => this.setState({time: text})}
          />
          <Text style={inviteStyles.title}> Playlist Name </Text>
          <TextInput
            style={inviteStyles.textInput}
            onChangeText={(name) => this.setState({playlistName: name})}
          />
          <Button title="Submit" onPress={this.handlePress} buttonStyle={{backgroundColor:'#1ED761'}}/>
        </ScrollView>
      </View>
    );
  }
}
