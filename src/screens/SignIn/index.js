import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from '~/store/ducks/auth';

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

import '~/config/StatusBar';
import { commons } from '~/styles';
import ButtonPrimary from '~/components/ButtonPrimary';
import { Input } from 'react-native-elements';

import validationSchema from './validation';
import logo from '~/assets/images/logo.png';

import styles from './styles';

function SignIn({ status, navigation, setNavigation, signInRequest }) {
  const emailRef = useRef();
  const passRef = useRef();

  useEffect(() => {
    setNavigation(navigation);
  });
  const handleLogin = async ({ email, password }) => {
    signInRequest(email, password);
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
            <View style={styles.containerSocial}>
              <Text style={[commons.textWhite, commons.fs17]}>
                Faça Login usando:
              </Text>
              <SocialIcon onPress={() => alert('Face')} type="facebook" />
              <SocialIcon onPress={() => alert('google')} type="google" />
            </View>
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
