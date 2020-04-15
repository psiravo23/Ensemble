import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as AuthSession from 'expo-auth-session';

export default class App extends React.Component {

  async componentDidMount() {
    const tokenExpirationTime = await getUserData('expirationTime');
    if (!tokenExpirationTime || new Date().getTime() > tokenExpirationTime) {
      await refreshTokens();
    } else {
      this.setState({ accessTokenAvailable: true });
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <Text>Testing</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
