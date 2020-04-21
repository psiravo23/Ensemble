import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
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
    this.state = {timerSet:time};
    this.calcTime = this.calcTime.bind(this);
  }

  calcTime(time) {
    return time * 60;
  }
  render(){
    return(
      <View style={styles.container}>
        <CountDown
              until={this.state.timerSet}
              onFinish={() => alert('finished')}
              size={20}
            />
        <Tab.Navigator>
          <Tab.Screen name="Songs" component={Songs} />
          <Tab.Screen name="Playlists" component={Playlists} />
          <Tab.Screen name="Artists" component={Artists} />
          <Tab.Screen name="Albums" component={Albums} />
        </Tab.Navigator>
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
                    <Text>{item.name}</Text>
                 </View>
              ))
           }
        </ScrollView>
       </View>
    );
  }
}

class Playlists extends React.Component{
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
