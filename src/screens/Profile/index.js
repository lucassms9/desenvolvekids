import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { Creators as AuthActions } from '~/store/ducks/auth';
import moment from 'moment';

import Header from '~/components/Header';
import FormUser from '~/components/FormUser';

import { maskOnlyCPF, maskOnlyPhone } from '~/helpers';

import { commons } from '~/styles';

function Profile({ auth: { user, status }, updateUserRequest }) {
  const handleSubmitForm = (values) => {
    updateUserRequest(values);
  };

  const initData = {
    name: user.nome,
    fiscalNumber: maskOnlyCPF(user.cpf),
    birthDate: moment(user.data_nascimento).format('DD/MM/YYYY'),
    email: user.email,
    parent: user.parentesco,
    phone: maskOnlyPhone(user.celular),
  };
  console.log(status);
  return (
    <View style={commons.bodyGlobal}>
      <Header title="Meus Dados" hasBack />
      <SafeAreaView style={commons.container}>
        <ScrollView style={{ marginBottom: 70 }}>
          <FormUser
            initData={initData}
            status={status}
            submitForm={handleSubmitForm}
            textButton="SALVAR DADOS"
            mode="update"
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const mapStateToProps = ({ auth }) => ({
  auth,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...AuthActions,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
