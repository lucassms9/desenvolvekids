import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';

import ButtonPrimary from '~/components/ButtonPrimary';
import Header from '~/components/Header';

import Form from './Form';
import { commons } from '~/styles';
import styles from './styles';

function SignUp({ userEntity, loading }) {
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

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
