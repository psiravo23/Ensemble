import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Button } from 'react-native';

import {styles} from './styles.js';

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
      <View>
        <Text> Add friends to your Ensemble Group </Text>
        <TextInput
          placeholder="enter spotify username"
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({username: text})}
          value={this.state.username}
        />
        <TouchableHighlight onPress={this.onInput}>
          <Text> Add </Text>
        </TouchableHighlight>
        {this.state.userList.map(user => (<Text> {user} </Text>))}
        <Text> Enter time limit in minutes </Text>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({time: text})}
        />
        <Button title="Submit" onPress={this.handlePress}/>
      </View>
    );
  }
}
