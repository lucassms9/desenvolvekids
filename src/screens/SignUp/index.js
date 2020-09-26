import React from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from '~/store/ducks/auth';

import Header from '~/components/Header';

import FormUser from '~/components/FormUser';
import styles from './styles';

function SignUp({ signUpRequest, userEntity, status }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      style={{ flex: 1 }}>
      <View style={styles.bodyLogin}>
        <Header title="Cadastre-se" hasBack />
        <SafeAreaView style={styles.container}>
          <View style={styles.containerLogin}>
            <ScrollView>
              <FormUser
                initData={userEntity}
                status={status}
                submitForm={signUpRequest}
              />
            </ScrollView>
          </View>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
}

const mapStateToProps = ({ auth: { user, status } }) => ({
  userEntity: user,
  status,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...AuthActions,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
