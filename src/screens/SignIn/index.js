import React from 'react';
import { connect } from 'react-redux';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Input, SocialIcon } from 'react-native-elements';

import '~/config/StatusBar';
import { commons } from '~/styles';
import ButtonPrimary from '~/components/ButtonPrimary';

import logo from '~/assets/images/logo.png';

import styles from './styles';

function SignIn({ loading, navigation }) {
  const requestLogin = () => {
    alert('faz login');
  };

  return (
    <View style={styles.bodyLogin}>
      <SafeAreaView style={styles.container}>
        <View style={styles.containerLogin}>
          <View style={styles.containerLogo}>
            <Image source={logo} />
          </View>
          <View style={styles.containerForm}>
            <Input
              placeholder="E-mail"
              inputStyle={commons.textWhite}
              labelStyle={commons.textWhite}
              label="E-mail"
            />
            <Input
              placeholder="Senha"
              label="Senha"
              inputStyle={commons.textWhite}
              labelStyle={commons.textWhite}
              secureTextEntry={true}
            />
            <View style={{ marginTop: 30 }}>
              <ButtonPrimary
                loading={loading}
                text="ENTRAR"
                action={requestLogin}
              />
            </View>

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

const mapStateToProps = ({ auth: { loading } }) => ({
  loading,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
