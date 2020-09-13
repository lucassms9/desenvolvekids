import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from '~/store/ducks/auth';

import Header from '~/components/Header';

import FormUser from '~/components/FormUser';
import styles from './styles';

function SignUp({ signUpRequest, userEntity, status }) {
  return (
    <View style={styles.bodyLogin}>
      <Header title="Cadastre-se" hasBack />
      <SafeAreaView style={styles.container}>
        <View style={styles.containerLogin}>
          <FormUser
            initData={userEntity}
            status={status}
            submitForm={signUpRequest}
          />
        </View>
      </SafeAreaView>
    </View>
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
