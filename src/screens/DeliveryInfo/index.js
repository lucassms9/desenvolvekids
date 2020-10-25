import React, { useState, useRef, useEffect } from 'react';

import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { connect, useDispatch } from 'react-redux';

import { Creators as PlanActions } from '~/store/ducks/plan';
import { Creators as AuthActions } from '~/store/ducks/auth';
import { Creators as OrderActions } from '~/store/ducks/order';

import { bindActionCreators } from 'redux';
import { ToastActionsCreators } from 'react-native-redux-toast';

import { CheckBox, Divider, Icon } from 'react-native-elements';

import Header from '~/components/Header';
import ModalDelivery from '~/components/ModalDelivery';
import ButtonPrimary from '~/components/ButtonPrimary';
import ButtonSecondary from '~/components/ButtonSecondary';
import { Modalize } from 'react-native-modalize';
import { commons, colors } from '~/styles';

import styles from './styles';

function DeliveryInfo({
  route,
  navigation,
  auth,
  cart,
  addAddressRequest,
  addDeliveryMethod,
}) {
  const { origem } = route.params;
  const dispatch = useDispatch();
  const modalizeRef = useRef(null);

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
    try {
      if (addressEdit) {
        address.id = addressEdit.id;
      }

      addAddressRequest(address);
      onOClose();
    } catch (error) {
      console.log(error);
    }
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
    if (origem === 'store') {
      if (!checkedAddress) {
        return dispatch(
          ToastActionsCreators.displayError(
            'Cadastre e escolha um endereço para continuar',
            5000,
          ),
        );
      }
      const deliveryFilter = auth.user.enderecos.find(
        (end) => end.id === checkedAddress,
      );
      addDeliveryMethod(deliveryFilter, cart.products);
    }
    return navigation.navigate('PaymentMethod', { origem });
  };

  return (
    <View style={commons.body}>
      <Header title="Endereço de Entrega" hasBack />
      <SafeAreaView style={styles.safe}>
        <View style={[commons.container, styles.container]}>
          <View style={[styles.pd15, { maxHeight: 500 }]}>
            <ScrollView>
              <Text style={styles.title}>Meus Endereços</Text>
              {auth.user.enderecos.map((endereco) => {
                return (
                  <View key={endereco.id}>
                    <View style={styles.deliveryItem}>
                      {origem !== 'options' ? (
                        <CheckBox
                          title={endereco.nome_endereco}
                          textStyle={styles.colorItem}
                          checkedColor={colors.primary}
                          uncheckedColor={colors.primary}
                          containerStyle={styles.checkBox}
                          onPress={() => {
                            setCheckedAddress(endereco.id);
                          }}
                          checked={checkedAddress === endereco.id}
                        />
                      ) : (
                        <View style={styles.pd10}>
                          <Text style={styles.addressName}>
                            {endereco.nome_endereco}
                          </Text>
                        </View>
                      )}
                      <TouchableOpacity onPress={() => editAddress(endereco)}>
                        <Icon color={colors.white} name="edit" type="feather" />
                      </TouchableOpacity>
                    </View>
                    <View style={styles.container}>
                      <Divider style={styles.divider} />
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          </View>

          <View style={styles.mg15}>
            <ButtonSecondary
              icon={
                <Icon
                  style={styles.icon}
                  color={colors.white}
                  size={18}
                  name="plus-circle"
                  type="feather"
                />
              }
              onPress={createAddress}
              text="NOVO ENDEREÇO"
            />
          </View>
        </View>
        {origem !== 'options' && (
          <View style={styles.mg15}>
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

const mapStateToProps = ({ plan, auth, product: { cart } }) => ({
  plan,
  auth,
  cart,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...PlanActions,
      ...AuthActions,
      ...OrderActions,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryInfo);
