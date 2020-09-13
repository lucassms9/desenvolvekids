import React, { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from '~/store/ducks/auth';

import Header from '~/components/Header';

import Form from './Form';
import styles from './styles';

function SignUp({ userEntity, loading, navigation, setNavigation }) {
  useEffect(() => {
    setNavigation(navigation);
  }, []);

  return (
    <View style={styles.bodyLogin}>
      <Header title="Cadastre-se" hasBack />
      <SafeAreaView style={styles.container}>
        <View style={styles.containerLogin}>
          <Form initData={userEntity} loading={loading} />
        </View>
      </SafeAreaView>
    </View>
  );
}

const mapStateToProps = ({ auth: { user, loading } }) => ({
  userEntity: user,
  loading,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...AuthActions,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
