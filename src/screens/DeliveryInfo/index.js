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

import { CheckBox, Divider, Icon } from 'react-native-elements';

import Header from '~/components/Header';
import ModalDelivery from '~/components/ModalDelivery';
import ButtonPrimary from '~/components/ButtonPrimary';
import ButtonSecondary from '~/components/ButtonSecondary';
import { Modalize } from 'react-native-modalize';
import { commons } from '~/styles';

import { colors } from '~/styles/index';

function DeliveryInfo({ route, navigation, auth, addAddressRequest }) {
  const { origem } = route.params;

  const modalizeRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [checkedAddress, setCheckedAddress] = useState(null);
  const [addressEdit, setAddressEdit] = useState({});

  const createAddress = () => {
    setAddressEdit({});
    onOpen();
  };
  const onOpen = () => {
    modalizeRef.current?.open();
  };

  const handleAddress = (address) => {
    if (addressEdit) {
      address.id = addressEdit.id;
    }

    addAddressRequest(address);
    onOClose();
  };

  const onOClose = () => {
    modalizeRef.current?.close();
  };

  const editAddress = (address) => {
    const dataAddress = {
      zipCode: address.cep,
      nameAddress: address.nome_endereco,
      address: address.endereco,
      city: address.cidade,
      complement: address.complemento,
      neighborhood: address.bairro,
      number: address.numero,
      recipient: address.nome_destinatario,
      state: address.estado,
      id: address.id,
    };

    setAddressEdit(dataAddress);
    onOpen();
  };

  const confirmAddres = () => {
    return navigation.navigate('PaymentMethod', { origem });
  };
  return (
    <View style={commons.body}>
      <Header title="Endereço de Entrega" hasBack />
      <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
        <View style={[commons.container, { flex: 1 }]}>
          <View style={{ padding: 15 }}>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>
              Meus Enderecos
            </Text>
            {auth.user.enderecos.map((endereco) => {
              return (
                <View key={endereco.id}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      paddingVertical: 10,
                      alignItems: 'center',
                    }}>
                    {origem !== 'options' ? (
                      <CheckBox
                        title={endereco.nome_endereco}
                        textStyle={{ color: '#fff' }}
                        checkedColor={colors.primary}
                        uncheckedColor={colors.primary}
                        containerStyle={{
                          backgroundColor: 'transparent',
                          borderColor: 'transparent',
                        }}
                        onPress={() => {
                          setCheckedAddress(endereco.id);
                        }}
                        checked={checkedAddress === endereco.id}
                      />
                    ) : (
                      <View style={{ padding: 10 }}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 16,
                            fontWeight: '500',
                          }}>
                          {endereco.nome_endereco}
                        </Text>
                      </View>
                    )}

                    <TouchableOpacity onPress={() => editAddress(endereco)}>
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
            <ButtonSecondary onPress={createAddress} text="NOVO ENDEREÇO" />
          </View>
        </View>
        {origem !== 'options' && (
          <View style={{ margin: 15 }}>
            <ButtonPrimary onPress={confirmAddres} text="CONFIMAR ENDEREÇO" />
          </View>
        )}
      </SafeAreaView>
      <Modalize modalHeight={700} ref={modalizeRef}>
        <ModalDelivery
          initData={addressEdit}
          handleAddress={handleAddress}
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

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryInfo);
