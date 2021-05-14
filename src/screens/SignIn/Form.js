import React, { useEffect, useRef } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';
import { SocialIcon, Icon } from 'react-native-elements';

import { commons } from '~/styles';
import ButtonPrimary from '~/components/ButtonPrimary';
import { Input } from 'react-native-elements';
import styles from './styles';

const Form = ({
  handleSubmit,
  navigation,
  values,
  setFieldValue,
  errors,
  userLogin,
  loginFacebook,
  loginGoogle,
  status,
  handleKeyChain,
  biometricHandle
}) => {
  const emailRef = useRef();
  const passRef = useRef();

  useEffect(() => {
    if (userLogin) {
      setFieldValue('email', userLogin);
    }
    console.log('userLogin',userLogin)
  }, [userLogin]);

  return (
    <View>
      <Input
        value={values.email}
        label={'E-mail'}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder={'E-mail'}
        onChangeText={(text) => setFieldValue('email', text)}
        ref={emailRef}
        onSubmitEditing={() => passRef.current.focus()}
      />
      {errors.email && <Text style={commons.error}>{errors.email}</Text>}
      <Input
        value={values.password}
        label={'Senha'}
        autoCapitalize="none"
        placeholder={'Senha'}
        onChangeText={(text) => setFieldValue('password', text)}
        secureTextEntry={true}
        ref={passRef}
      />
      {errors.password && <Text style={commons.error}>{errors.password}</Text>}
      <View style={styles.containerSocial}>
        <Text style={[commons.fs17]}>Entrar com</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        <SocialIcon onPress={loginFacebook} type="facebook" />
        <SocialIcon onPress={loginGoogle} type="google" />
        {biometricHandle && (
          <View style={{ marginTop: 5 }}>
            <TouchableOpacity onPress={handleKeyChain}>
              <Icon
                name="md-finger-print"
                size={50}
                color="black"
                type="ionicon"
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.mp30}>
        <ButtonPrimary
          loading={status === 'loading'}
          text="ENTRAR"
          onPress={handleSubmit}
        />
      </View>

      <View style={styles.containerFooter}>
        <TouchableOpacity
          onPress={() => {
            navigation.push('SignUp');
          }}>
          <Text style={[commons.fs17, styles.mp30]}>Registre-se!</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.push('Recover');
          }}>
          <Text style={[commons.fs17, styles.mp30]}>Esqueci Minha Senha</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Form;
