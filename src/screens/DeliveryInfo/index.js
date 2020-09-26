import React, { useState, useRef } from 'react';

import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native';
import { CheckBox, Divider } from 'react-native-elements';

import Header from '~/components/Header';
import ModalDelivery from '~/components/ModalDelivery';
import ButtonPrimary from '~/components/ButtonPrimary';
import ButtonSecondary from '~/components/ButtonSecondary';
import { Modalize } from 'react-native-modalize';
import { commons } from '~/styles';

import styles from './styles';
import { colors } from '~/styles/index';

function DeliveryInfo({ navigation }) {
  const modalizeRef = useRef(null);

  const [visible, setVisible] = useState(false);

  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onOClose = () => {
    modalizeRef.current?.close();
  };
  const confirmAddres = () => {
    navigation.navigate('PaymentMethod');
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
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <CheckBox
                  title="Casa"
                  textStyle={{ color: '#fff' }}
                  checkedColor={colors.primary}
                  uncheckedColor={colors.primary}
                  containerStyle={{
                    backgroundColor: 'transparent',
                    borderColor: 'transparent',
                  }}
                  checked
                />
                <TouchableOpacity onPress={onOpen}>
                  <Text style={{ color: '#fff' }}>Ver/Editar Endereço</Text>
                </TouchableOpacity>
              </View>
              <View style={{ flex: 1 }}>
                <Divider style={{ backgroundColor: '#fff' }} />
              </View>
            </View>
          </View>
          <View style={{ margin: 15 }}>
            <ButtonSecondary onPress={onOpen} text="NOVO ENDEREÇO" />
          </View>
        </View>
        <View style={{ margin: 15 }}>
          <ButtonPrimary onPress={confirmAddres} text="CONFIMAR ENDEREÇO" />
        </View>
      </SafeAreaView>
      <Modalize modalHeight={700} ref={modalizeRef}>
        <ModalDelivery onOClose={onOClose} />
      </Modalize>
    </View>
  );
}

export default DeliveryInfo;
