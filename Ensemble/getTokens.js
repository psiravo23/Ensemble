import { encode as btoa } from 'base-64';

import {credentials} from './secrets.js';
import {setUserData} from './handleUserData.js';
import {getUserData} from './handleUserData.js';

import {getAuthorizationCode} from './getAuthorizationCode.js';

export const getTokens = async () => {
  try {
    const authorizationCode = await getAuthorizationCode() //we wrote this function above
    //console.log(authorizationCode);
    const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
    const redirectUrl = encodeURIComponent(credentials.redirectUri);
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        //'Authorization': `Basic ${credsB64}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${redirectUrl}&client_id=${credentials.clientId}&client_secret=${credentials.clientSecret}`,
    });
    //console.log(response.status);
    const responseJson = await response.json();
    //console.log(responseJson);

    const expirationTime = new Date().getTime() + responseJson.expires_in * 1000;
    //console.log(JSON.stringify(expirationTime));
    await setUserData('accessToken', responseJson.access_token);
    //console.log(await getUserData('accessToken'));
    await setUserData('refreshToken', responseJson.refresh_token);
    await setUserData('expirationTime', JSON.stringify(expirationTime));

  } catch (err) {
    console.error(err);
  }
}
