import React, { useState, useRef, useEffect } from 'react';

import { View, Text, SafeAreaView, TouchableOpacity,Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Creators as PlanActions } from '~/store/ducks/plan';
import { Creators as AuthActions } from '~/store/ducks/auth';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { Icon, Divider } from 'react-native-elements';

import Header from '~/components/Header';
import ModalChildren from '~/components/ModalChildren';

import ButtonSecondary from '~/components/ButtonSecondary';
import { Modalize } from 'react-native-modalize';
import { commons } from '~/styles';

import { maskOnlyPhone } from '~/helpers';
import styles from './styles';
import { colors } from '~/styles/index';

function Childrens({ anavigation, auth, addChildrenRequest }) {
  const modalizeRef = useRef(null);

  const [childrenEdit, setChildrenEdit] = useState({});
  const [heightModal, setHeightModal] = useState(0);

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
      birthDate: moment(children.data_nascimento).format('DD/MM/YYYYY'),
      nickName: children.apelido,
    };

    setChildrenEdit(dataChildren);
    onOpen();
  };

  useEffect(()=>{
    const percent = Dimensions.get('window').height * 0.80;
    console.log(percent);
    setHeightModal(percent);
  },[])
  return (
    <View style={commons.body}>
      <Header title="Crianças" hasBack />
      <SafeAreaView style={styles.safe}>
        <View style={[commons.container, styles.container]}>
          <View style={styles.pd15}>
            <Text style={styles.title}>Meus Filhos</Text>
            {auth && auth.user && auth.user.filhos && (
              <View>
                {auth.user.filhos.map((filho) => {
                  return (
                    <View key={filho.id}>
                      <View style={styles.childrenItem}>
                        <View style={styles.pd10}>
                          <Text style={styles.subTitle}>{filho.nome}</Text>
                        </View>
                        <TouchableOpacity onPress={() => editChildren(filho)}>
                          <Icon
                            name="edit"
                            type="feather"
                          />
                        </TouchableOpacity>
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
              onPress={createChildren}
              text="NOVO FILHO"
            />
          </View>
        </View>
      </SafeAreaView>
      <Modalize modalHeight={heightModal} ref={modalizeRef}>
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
