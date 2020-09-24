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

function MethodPayment({ navigation }) {
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
        <View style={[commons.container, { flex: 1 }]}>
          <View style={{ padding: 15 }}>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>
              Forma de pagamento
            </Text>
          </View>
        </View>
        <View style={{ margin: 15 }}>
          <ButtonPrimary
            onPress={confirmPayment}
            text="CONFIMAR FORMA DE PAGAMENTO"
          />
        </View>
      </SafeAreaView>
      <Modalize modalHeight={700} ref={modalizeRef}>
        <ModalDelivery onOClose={onOClose} />
      </Modalize>
    </View>
  );
}

export default MethodPayment;
