import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from '~/store/ducks/auth';

import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SocialIcon } from 'react-native-elements';
import { Formik } from 'formik';

import '~/config/StatusBar';
import { commons } from '~/styles';
import ButtonPrimary from '~/components/ButtonPrimary';
import InputText from '~/components/InputText';

import validationSchema from './validation';
import logo from '~/assets/images/logo.png';

import styles from './styles';

function SignIn({ status, navigation, setNavigation, signInRequest }) {
  useEffect(() => {
    setNavigation(navigation);
  });
  const handleLogin = async ({ email, senha }) => {
    signInRequest(email, senha);
  };

  console.log(status);
  return (
    <View style={styles.bodyLogin}>
      <SafeAreaView style={styles.container}>
        <View style={styles.containerLogin}>
          <View style={styles.containerLogo}>
            <Image source={logo} />
          </View>
          <View style={styles.containerForm}>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={(values) => handleLogin(values)}>
              {({ handleSubmit, values, setFieldValue, errors }) => (
                <View>
                  <InputText
                    value={values.email}
                    label={'E-mail'}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    placeholder={'E-mail'}
                    onChangeText={(text) => setFieldValue('email', text)}
                  />
                  {errors.email && (
                    <Text style={commons.error}>{errors.email}</Text>
                  )}
                  <InputText
                    value={values.password}
                    label={'Senha'}
                    autoCapitalize="none"
                    placeholder={'Senha'}
                    onChangeText={(text) => setFieldValue('password', text)}
                    secureTextEntry={true}
                  />
                  {errors.password && (
                    <Text style={commons.error}>{errors.password}</Text>
                  )}
                  <View style={{ marginTop: 30 }}>
                    <ButtonPrimary
                      loading={status === 'loading'}
                      text="ENTRAR"
                      onPress={handleSubmit}
                    />
                  </View>
                </View>
              )}
            </Formik>
            <View style={styles.containerSocial}>
              <Text style={[commons.textWhite, { fontSize: 17 }]}>
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
              <Text style={[commons.textWhite, { fontSize: 17 }]}>
                Registre-se!
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                navigation.push('Recover');
              }}>
              <Text style={[commons.textWhite, { fontSize: 17 }]}>
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
