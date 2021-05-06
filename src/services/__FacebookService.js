import {
  AccessToken,
  AuthenticationToken,
  LoginManager,
} from 'react-native-fbsdk-next';

export const fetchProfile = async () => {
  try {
    const result = await LoginManager.logInWithPermissions(
      ['public_profile', 'email'],
      'limited',
      'my_nonce',
    );
    console.log(result);

    if (Platform.OS === 'ios') {
      const result = await AuthenticationToken.getAuthenticationTokenIOS();
      console.log(result?.authenticationToken);
    } else {
      const result = await AccessToken.getCurrentAccessToken();
      console.log(result?.accessToken);
    }
  } catch (error) {
    console.log(error);
  }
};