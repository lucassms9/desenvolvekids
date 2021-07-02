import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SafeAreaView, View, ScrollView } from 'react-native';
import { Creators as AuthActions } from '~/store/ducks/auth';
import moment from 'moment';
import api from '~/services/api';
import Header from '~/components/Header';
import FormUser from '~/components/FormUser';

import { maskOnlyCPF, maskOnlyPhone, maskOnlyCEP } from '~/helpers';

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

  const endreco ={};
  const initData = {
    name: user?.nome,
    fiscalNumber: maskOnlyCPF(user?.cpf),
    birthDate: moment(user?.data_nascimento).format('DD/MM/YYYY'),
    email: user?.email,
    parent: user?.clientes_parentescos_id,
    phone: maskOnlyPhone(user?.celular),

    zipCode: endreco?.cep ? maskOnlyCEP(endreco?.cep) : '',
    nameAddress: endreco?.nome_endereco,
    address: endreco?.endereco,
    city: endreco?.cidade,
    complement: endreco?.complemento,
    neighborhood: endreco?.bairro,
    number: endreco?.numero,
    recipient: endreco?.nome_destinatario,
    state: endreco?.estado,
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
