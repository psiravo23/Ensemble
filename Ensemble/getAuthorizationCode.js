import * as AuthSession from 'expo-auth-session';

import {credentials} from './secrets.js';

const scopesArr = ['user-library-read','playlist-modify-public', 'user-follow-read', 'user-read-private'];
const scopes = scopesArr.join(' ');

export const getAuthorizationCode = async () => {
  const redirectUrl = AuthSession.getRedirectUrl();
  var result;
  try {
    const redirectUrl = AuthSession.getRedirectUrl();
    result = await AuthSession.startAsync({
      authUrl:
        'https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' +
        credentials.clientId +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' +
        encodeURIComponent(redirectUrl)
    })
    //console.log(result);

  } catch (err) {
    console.error(err)
  }

  return result.params.code
}
