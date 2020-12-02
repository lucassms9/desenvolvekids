import React, { useState, useEffect } from 'react';
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
import api from '~/services/api';
import FormUser from '~/components/FormUser';
import styles from './styles';

function SignUp({ signUpRequest, status, route }) {
  const [kinShips, setKinShips] = useState([]);

  const initData = route.params
    ? {
        email: route.params.email,
        name: route.params.first_name,
        lastName: route.params.last_name,
      }
    : {};

  const getKinShips = async () => {
    const res = await api.post('login/get-parentescos');

    const hadleItem = res.items.map((item) => ({
      label: item.nome,
      value: item.id,
    }));

    setKinShips(hadleItem);
  };
  useEffect(() => {
    getKinShips();
  }, []);
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
                initData={initData}
                status={status}
                submitForm={signUpRequest}
                kinShips={kinShips}
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
