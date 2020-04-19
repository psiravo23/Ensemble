import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';


export class InviteScreen extends React.Component{

  constructor (props) {
    super(props);
    this.state = {userList: []};
    this.handlePress = this.handlePress.bind(this);
  }

  handlePress () {
    this.props.navigation.navigate('UserLibrary');
  }

  render(){
    return(
        <View>
            <Text> Add friends to your Ensemble Group </Text>

            <Input placeholder='enter spotify username'/>
            <Button title="Submit"
                    onPress={this.handlePress}/>

            <TextInput
              onChangeText={this.onInput}/>
            <Text> {this.state.userList} </Text>
        </View>
    );
  }
}
