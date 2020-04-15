import { encode as btoa } from 'base-64';
import { AuthSession } from 'expo';

class SpotifyLoginScreen extends React.Component{
  //secrets
  export const spotifyCredentials = {
    clientId: 'd952cfadc4804e58bc051c7a80aa062a',
    clientSecret: '7a555ce02e544391817fab08505a5add',
    redirectUri: 'https://auth.expo.io/@rchakale/Ensemble'
  }

  //getAuthorizationCode
  const scopesArr = ['user-modify-playback-state','user-read-currently-playing','user-read-playback-state','user-library-modify',
                     'user-library-read','playlist-read-private','playlist-read-collaborative','playlist-modify-public',
                     'playlist-modify-private','user-read-recently-played','user-top-read'];
  const scopes = scopesArr.join(' ');

  const getAuthorizationCode = async () => {
    try {
      const credentials = await getSpotifyCredentials() //we wrote this function above
      const redirectUrl = AuthSession.getRedirectUrl(); //this will be something like https://auth.expo.io/@your-username/your-app-slug
      const result = await AuthSession.startAsync({
        authUrl:
          'https://accounts.spotify.com/authorize' +
          '?response_type=code' +
          '&client_id=' +
          credentials.clientId +
          (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
          '&redirect_uri=' +
          encodeURIComponent(redirectUrl),
      })
    } catch (err) {
      console.error(err)
    }
    return result.params.code
  }
  //getTokens
  const getTokens = async () => {
    try {
      const authorizationCode = await getAuthorizationCode()
      const credentials = await getSpotifyCredentials()
      const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${credsB64}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${
          credentials.redirectUri
        }`,
      });
      const responseJson = await response.json();

      const {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: expiresIn,
      } = responseJson;

      const expirationTime = new Date().getTime() + expiresIn * 1000;
      await setUserData('accessToken', accessToken);
      await setUserData('refreshToken', refreshToken);
      await setUserData('expirationTime', expirationTime);
    } catch (err) {
      console.error(err);
    }
  }
  //refreshTokens
  const getTokens = async () => {
    try {
      const authorizationCode = await getAuthorizationCode()
      const credentials = await getSpotifyCredentials()
      const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          Authorization: `Basic ${credsB64}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${
          credentials.redirectUri
        }`,
      });
      const responseJson = await response.json();

      const {
        access_token: accessToken,
        refresh_token: refreshToken,
        expires_in: expiresIn,
      } = responseJson;

      const expirationTime = new Date().getTime() + expiresIn * 1000;
      await setUserData('accessToken', accessToken);
      await setUserData('refreshToken', refreshToken);
      await setUserData('expirationTime', expirationTime);
    } catch (err) {
      console.error(err);
    }
  }
}
