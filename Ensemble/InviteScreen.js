import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Button } from 'react-native-elements';

import {inviteStyles} from './styles.js';

export class InviteScreen extends React.Component{

  constructor (props) {
    super(props);
    this.state = {username: '', userList: [], time: ''};
    this.onInput = this.onInput.bind(this);
    this.handlePress = this.handlePress.bind(this);
    this.handleNoTimeSet = this.handleNoTimeSet.bind(this);
  }

  handlePress () {
    var timeSet = this.state.time;
    if (timeSet === ('')) {
      this.handleNoTimeSet()
    }
    else {
      this.props.navigation.navigate('UserLibrary', {time:timeSet});
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
        <Button title="Submit" onPress={this.handlePress} buttonStyle={{backgroundColor:'#1ED761'}}/>
      </View>
    );
  }
}
