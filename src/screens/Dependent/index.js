import React, { useEffect, useState, useRef, useMemo } from 'react';

import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Creators as PlanActions } from '~/store/ducks/plan';
import { Creators as AuthActions } from '~/store/ducks/auth';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { Icon, Divider } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { ToastActionsCreators } from 'react-native-redux-toast';

import Header from '~/components/Header';
import ModalDependent from '~/components/ModalDependent';

import api from '~/services/api';
import ButtonSecondary from '~/components/ButtonSecondary';
import { Modalize } from 'react-native-modalize';
import { commons } from '~/styles';

import { maskOnlyPhone, maskCPF } from '~/helpers';
import styles from './styles';
import { colors } from '~/styles/index';
import { maskOnlyCPF } from '~/helpers/index';

function Dependent({
  navigation,
  auth,
  addDependentRequest,
  rmDependentRequest,
}) {
  const modalizeRef = useRef(null);
  const dispatch = useDispatch();

  const [dependentEdit, setDependentEdit] = useState({});
  const [canAddDependent, setCanAddDependent] = useState(false);

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

  const createDependent = () => {
    if (
      auth &&
      auth.user &&
      auth.user.dependentes &&
      auth.user.dependentes.length > 0
    ) {
      return dispatch(
        ToastActionsCreators.displayError(
          'Você pode cadastrar até 1 dependente',
          5000,
        ),
      );
    }
    setDependentEdit({});
    onOpen();
  };
  const onOpen = () => {
    modalizeRef.current?.open();
  };

  useEffect(() => {
    if(
      auth &&
      auth.user &&
      auth.user.dependentes &&
      auth.user.dependentes.length > 0
    ){
      setCanAddDependent(false);
    }else{
      setCanAddDependent(true);
    }
   
  },[auth]);

  const handleDependent = (dependent) => {
    if (dependentEdit) {
      dependent.id = dependent.id;
    }

    console.log(dependent)
    addDependentRequest(dependent);
    getKinShips();
    onOClose();
  };

  const onOClose = () => {
    modalizeRef.current?.close();
  };

  const editDependent = (dependent) => {
    const dataDependent = {
      id: dependent.id,
      name: dependent.nome,
      parent: dependent.clientes_parentescos_id,
      fiscalNumber: maskOnlyCPF(dependent.cpf),
      email: dependent.email,
      birthDate: moment(dependent.data_nascimento).format('DD/MM/YYYYY'),
      phone: maskOnlyPhone(dependent.celular),
    };

    setDependentEdit(dataDependent);
    onOpen();
  };

  return (
    <View style={commons.body}>
      <Header title="Dependentes" hasBack />
      <SafeAreaView style={styles.safe}>
        <View style={[commons.container, styles.container]}>
          <View style={styles.pd15}>
            <Text style={styles.title}>Compartilhado com</Text>
            {auth && auth.user && auth.user.dependentes && (
              <View>
                {auth.user.dependentes.map((dependent) => {
                  return (
                    <View key={dependent.id}>
                      <View style={styles.childrenItem}>
                        <View style={styles.pd10}>
                          <Text style={styles.subTitle}>{dependent.nome}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                          <TouchableOpacity
                            style={{ marginHorizontal: 10 }}
                            onPress={() => rmDependentRequest(dependent.id)}>
                            <Icon
                              
                              name="divide-circle"
                              type="feather"
                            />
                          </TouchableOpacity>
                          <TouchableOpacity
                            onPress={() => editDependent(dependent)}>
                            <Icon
                             
                              name="edit"
                              type="feather"
                            />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View style={styles.container}>
                        <Divider style={styles.dividir} />
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
          <View style={styles.mg15}>
            {canAddDependent && (
              <ButtonSecondary
              icon={
                <Icon
                  style={styles.icone}
                  color={colors.white}
                  size={18}
                  name="plus-circle"
                  type="feather"
                />
              }
              onPress={createDependent}
              text="NOVO DEPENDENTE"
            />
            )}
            
          </View>
        </View>
      </SafeAreaView>
      <Modalize modalHeight={600} ref={modalizeRef}>
        <ModalDependent
          initData={dependentEdit}
          handleAddress={handleDependent}
          onOClose={onOClose}
          kinShips={kinShips}
        />
      </Modalize>
    </View>
  );
}

const mapStateToProps = ({ plan, auth }) => ({
  plan,
  auth,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...PlanActions,
      ...AuthActions,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Dependent);
