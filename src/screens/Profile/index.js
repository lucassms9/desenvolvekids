import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { Creators as AuthActions } from '~/store/ducks/auth';
import moment from 'moment';
import api from '~/services/api';
import Header from '~/components/Header';
import FormUser from '~/components/FormUser';

import { maskOnlyCPF, maskOnlyPhone } from '~/helpers';

import { commons } from '~/styles';

function Profile({ auth: { user, status }, updateUserRequest }) {
  const handleSubmitForm = (values) => {
    updateUserRequest(values);
  };

  const [kinShips, setKinShips] = useState([]);

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

  const initData = {
    name: user.nome,
    fiscalNumber: maskOnlyCPF(user.cpf),
    birthDate: moment(user.data_nascimento).format('DD/MM/YYYY'),
    email: user.email,
    parent: user.clientes_parentescos_id,
    phone: maskOnlyPhone(user.celular),
  };

  return (
    <View style={commons.bodyGlobal}>
      <Header title="Meus Dados" hasBack />
      <SafeAreaView style={commons.container}>
        <ScrollView style={{ marginBottom: 100 }}>
          <FormUser
            initData={initData}
            status={status}
            submitForm={handleSubmitForm}
            textButton="SALVAR DADOS"
            mode="update"
            kinShips={kinShips}
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
