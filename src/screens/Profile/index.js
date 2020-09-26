import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { Creators as AuthActions } from '~/store/ducks/auth';

import Header from '~/components/Header';
import FormUser from '~/components/FormUser';
import ButtonSecondary from '~/components/ButtonSecondary';

import { commons } from '~/styles';

function Profile({ userEntity, loading, signOutRequest }) {
  const handleSubmitForm = (values) => {
    console.log(values);
    alert('aqui');
  };

  return (
    <View style={commons.bodyGlobal}>
      <Header title="Meus Dados" hasBack />
      <SafeAreaView style={commons.container}>
        <ScrollView style={{ marginBottom: 70 }}>
          <FormUser
            initData={userEntity}
            loading={loading}
            submitForm={handleSubmitForm}
            textButton="SALVAR DADOS"
          />
          <View style={{ marginTop: 15 }}>
            <ButtonSecondary text="FAZER LOGOUT" onPress={signOutRequest} />
          </View>
        </ScrollView>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
