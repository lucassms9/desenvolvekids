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
import ModalPaymentMethod from '~/components/ModalPaymentMethod';
import ButtonPrimary from '~/components/ButtonPrimary';
import ButtonSecondary from '~/components/ButtonSecondary';
import TitleCard from '~/components/TitleCard';
import { Modalize } from 'react-native-modalize';
import { commons } from '~/styles';

import styles from './styles';
import { colors } from '~/styles/index';

function PaymentMethod({ navigation }) {
  const modalizeRef = useRef(null);

  const [visible, setVisible] = useState(false);

  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onOClose = () => {
    modalizeRef.current?.close();
  };
  const confirmPayment = () => {
    navigation.navigate('FinishedOrder');
  };

  return (
    <View style={commons.body}>
      <Header title="Forma de Pagamento" hasBack />
      <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
        <ScrollView style={[commons.container, { flex: 1 }]}>
          <View style={{ padding: 15 }}>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>
              Forma de pagamento
            </Text>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <CheckBox
                title="Boleto"
                textStyle={{ color: '#fff' }}
                checkedColor={colors.primary}
                uncheckedColor={colors.primary}
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                }}
                checked
              />
            </View>
            <View style={{ flex: 1 }}>
              <Divider style={{ backgroundColor: '#fff' }} />
            </View>
          </View>
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <CheckBox
                title={<TitleCard />}
                textStyle={{ color: '#fff' }}
                checkedColor={colors.primary}
                uncheckedColor={colors.primary}
                containerStyle={{
                  backgroundColor: 'transparent',
                  borderColor: 'transparent',
                }}
                checked
              />
            </View>
            <View style={{ flex: 1 }}>
              <Divider style={{ backgroundColor: '#fff' }} />
            </View>
          </View>
          <View style={{ margin: 15 }}>
            <ButtonSecondary onPress={onOpen} text="ADICIONAR NOVO CARTÃO" />
          </View>
        </ScrollView>
        <View style={{ margin: 15 }}>
          <ButtonPrimary
            onPress={confirmPayment}
            text="CONFIMAR FORMA DE PAGAMENTO"
          />
        </View>
      </SafeAreaView>
      <Modalize modalHeight={700} ref={modalizeRef}>
        <ModalPaymentMethod onOClose={onOClose} />
      </Modalize>
    </View>
  );
}

export default PaymentMethod;
