import React, { useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';

import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from '~/store/ducks/auth';
import { facebookService } from '~/services/FacebookService';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Platform,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { Formik } from 'formik';
import { ToastActionsCreators } from 'react-native-redux-toast';
import '~/config/StatusBar';
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
import Profile from '../Profile/index';

function SignIn({ status, navigation, setNavigation, signInRequest }) {
  const emailRef = useRef();
  const passRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    setNavigation(navigation);
    GoogleSignin.configure({
      scopes: ['email'], // what API you want to access on behalf of the user, default is email and profile
      webClientId:
        '863121690538-pqi8e98qc542kh64nds6qgv65gr84ao4.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    });
  }, []);

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
    // signInRequest(result.email, null, result);
  };

  const loginFacebook = () => {
    // Attempt a login using the Facebook login dialog asking for default permissions.
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
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
        alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };
  return (
    <View style={styles.bodyLogin}>
      <SafeAreaView style={styles.container}>
        <View style={styles.containerLogin}>
          <View style={styles.containerLogo}>
            <Image source={logo} />
          </View>
          <View style={styles.containerForm}>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : null}>
              <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={validationSchema}
                onSubmit={(values) => handleLogin(values)}>
                {({ handleSubmit, values, setFieldValue, errors }) => (
                  <View>
                    <Input
                      inputStyle={commons.textWhite}
                      labelStyle={commons.textWhite}
                      value={values.email}
                      label={'E-mail'}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      placeholder={'E-mail'}
                      onChangeText={(text) => setFieldValue('email', text)}
                      ref={emailRef}
                      onSubmitEditing={() => passRef.current.focus()}
                    />
                    {errors.email && (
                      <Text style={commons.error}>{errors.email}</Text>
                    )}
                    <Input
                      inputStyle={commons.textWhite}
                      labelStyle={commons.textWhite}
                      value={values.password}
                      label={'Senha'}
                      autoCapitalize="none"
                      placeholder={'Senha'}
                      onChangeText={(text) => setFieldValue('password', text)}
                      secureTextEntry={true}
                      ref={passRef}
                    />
                    {errors.password && (
                      <Text style={commons.error}>{errors.password}</Text>
                    )}
                    <View style={styles.containerSocial}>
                      <Text style={[commons.textWhite, commons.fs17]}>
                        Entrar com
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: 20,
                      }}>
                      <SocialIcon onPress={loginFacebook} type="facebook" />
                      <SocialIcon onPress={loginGoogle} type="google" />
                    </View>

                    <View style={styles.mp30}>
                      <ButtonPrimary
                        loading={status === 'loading'}
                        text="ENTRAR"
                        onPress={handleSubmit}
                      />
                    </View>
                  </View>
                )}
              </Formik>
            </KeyboardAvoidingView>
          </View>
          <View style={styles.containerFooter}>
            <TouchableOpacity
              onPress={() => {
                navigation.push('SignUp');
              }}>
              <Text style={[commons.textWhite, commons.fs17]}>
                Registre-se!
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.push('Recover');
              }}>
              <Text style={[commons.textWhite, commons.fs17]}>
                Esqueci Minha Senha
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
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
