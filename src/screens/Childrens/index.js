import React, { useState, useRef } from 'react';

import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { connect } from 'react-redux';
import { Creators as PlanActions } from '~/store/ducks/plan';
import { Creators as AuthActions } from '~/store/ducks/auth';
import { bindActionCreators } from 'redux';
import momento from 'moment';
import { Icon, Divider } from 'react-native-elements';

import Header from '~/components/Header';
import ModalChildren from '~/components/ModalChildren';
import ButtonPrimary from '~/components/ButtonPrimary';
import ButtonSecondary from '~/components/ButtonSecondary';
import { Modalize } from 'react-native-modalize';
import { commons } from '~/styles';

import { maskOnlyPhone } from '~/helpers';

function Childrens({ navigation, auth, addChildrenRequest }) {
  const modalizeRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [childrenEdit, setChildrenEdit] = useState({});

  const createChildren = () => {
    setChildrenEdit({});
    onOpen();
  };
  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const handleChildren = (children) => {
    if (childrenEdit) {
      children.id = childrenEdit.id;
    }

    addChildrenRequest(children);
    onOClose();
  };

  const onOClose = () => {
    modalizeRef.current?.close();
  };

  const editChildren = (children) => {
    const dataChildren = {
      id: children.id,
      name: children.nome,
      email: children.email,
      birthDate: momento(children.data_nascimento).format('DD/MM/YYYYY'),
      nickName: children.apelido,
      phone: maskOnlyPhone(children.celular),
    };

    setChildrenEdit(dataChildren);
    onOpen();
  };

  return (
    <View style={commons.body}>
      <Header title="Filhos" hasBack />
      <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
        <View style={[commons.container, { flex: 1 }]}>
          <View style={{ padding: 15 }}>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>
              Meus Filhos
            </Text>
            {auth.user.filhos.map((filho) => {
              return (
                <View key={filho.id}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 10,
                      alignItems: 'center',
                    }}>
                    <View style={{ padding: 10 }}>
                      <Text
                        style={{
                          color: '#fff',
                          fontSize: 16,
                          fontWeight: '600',
                        }}>
                        {filho.nome}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => editChildren(filho)}>
                      <Icon color="#fff" name="edit" type="feather" />
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Divider style={{ backgroundColor: '#fff' }} />
                  </View>
                </View>
              );
            })}
          </View>
          <View style={{ margin: 15 }}>
            <ButtonSecondary
              icon={
                <Icon
                  style={{ marginRight: 5, marginTop: 3 }}
                  color="#fff"
                  size={18}
                  name="plus-circle"
                  type="feather"
                />
              }
              onPress={createChildren}
              text="NOVO FILHO"
            />
          </View>
        </View>
      </SafeAreaView>
      <Modalize modalHeight={700} ref={modalizeRef}>
        <ModalChildren
          initData={childrenEdit}
          handleAddress={handleChildren}
          onOClose={onOClose}
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

export default connect(mapStateToProps, mapDispatchToProps)(Childrens);
