import React, { useEffect, useRef, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from '~/store/ducks/auth';
import { facebookService } from '~/services/FacebookService';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  Image,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { Formik } from 'formik';
import { ToastActionsCreators } from 'react-native-redux-toast';

import { commons } from '~/styles';
import ButtonPrimary from '~/components/ButtonPrimary';
import { Input } from 'react-native-elements';

import validationSchema from './validation';
import logo from '~/assets/images/logo.png';

import {
  GoogleSignin,
  statusCodes,
} from '@react-native-community/google-signin';

import { LoginManager } from 'react-native-fbsdk';

import styles from './styles';
import storageKeys from '~/helpers/storageKeys';
import Form from './Form';
import { getInternetKey, hasInternetKey } from '~/services/keyChain';

function SignIn({ status, navigation, setNavigation, signInRequest, route }) {
  const dispatch = useDispatch();
  const [userLogin, setUserLogin] = useState('');
  const [biometricHandle, setBiometricHandle] = useState(false);

  useEffect(() => {
    console.log(navigation);
    setNavigation({ ...navigation, ...route });
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '863121690538-pqi8e98qc542kh64nds6qgv65gr84ao4.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
    getLoginStorage();
  }, []);

  const getLoginStorage = async () => {
    const biometricHandle = await hasInternetKey();
    console.log('biometricHandle', biometricHandle);
    const emailPhone = await AsyncStorage.getItem(storageKeys.userLogin);
    setUserLogin(emailPhone);
    setBiometricHandle(biometricHandle);
  };

  const handleKeyChain = async () => {
    try {
      const { username, password } = await getInternetKey();
      if (username) {
        signInRequest(username.trim(), password.trim());
      }
    } catch (error) {
      console.log('error1', error);
    }
  };

  const handleLogin = async ({ email, password }) => {
    signInRequest(email, password);
  };

  const handlCallBack = (error, result) => {
    if (result) {
      console.log(result);
      const profile = result;
      profile.avatar = `https://graph.facebook.com/${result.id}/picture`;

      signInRequest(result.email, null, result);
    } else {
      console.log(error);
      dispatch(
        ToastActionsCreators.displayError('Erro ao logar. Tente novamente.'),
      );
    }
  };

  const profile = async () => {
    const result = await facebookService.fetchProfile(handlCallBack);
  };

  const loginFacebook = () => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions([
      'public_profile',
      'email',
      'user_friends',
    ]).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          profile();
        }
      },
      function (error) {
        console.log('Login fail with error: ' + error);
      },
    );
  };

  const loginGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.configure({
        webClientId:
          '863121690538-o9ka9hnbgtvfrh2qv4e6td8btb3c8vc6.apps.googleusercontent.com',
        offlineAccess: true,
      });

      const { user } = await GoogleSignin.signIn();
      const data = {
        email: user.email,
        first_name: user.givenName,
        last_name: user.familyName,
      };
      signInRequest(user.email, null, data);
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        <View style={styles.containerLogin}>
          <View style={styles.containerLogo}>
            <Image source={logo} />
          </View>
          <View style={styles.containerForm}>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={(values) => handleLogin(values)}>
              {(props) => (
                <Form
                  {...props}
                  navigation={navigation}
                  userLogin={userLogin}
                  status={status}
                  loginGoogle={loginGoogle}
                  loginFacebook={loginFacebook}
                  biometricHandle={biometricHandle}
                  handleKeyChain={handleKeyChain}
                />
              )}
            </Formik>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const mapStateToProps = ({ auth: { status } }) => ({
  status,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...AuthActions,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
