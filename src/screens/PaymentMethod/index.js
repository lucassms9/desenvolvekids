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
import { connect } from 'react-redux';
import { Creators as PlanActions } from '~/store/ducks/plan';
import { bindActionCreators } from 'redux';

import Header from '~/components/Header';
import ModalPaymentMethod from '~/components/ModalPaymentMethod';
import ButtonPrimary from '~/components/ButtonPrimary';
import ButtonSecondary from '~/components/ButtonSecondary';
import TitleCard from '~/components/TitleCard';
import { Modalize } from 'react-native-modalize';
import { commons } from '~/styles';

import styles from './styles';
import { colors } from '~/styles/index';

function PaymentMethod({ navigation, route, addMethodPayment, plan }) {
  const { origem } = route.params;
  const modalizeRef = useRef(null);

  const [visible, setVisible] = useState(false);
  const [cardChecked, setCardChecked] = useState(null);
  const [cards, setCards] = useState([]);

  const onOpen = () => {
    modalizeRef.current?.open();
  };
  const onOClose = () => {
    modalizeRef.current?.close();
  };
  const onSave = (data) => {
    const oldCards = [...cards, data];
    setCards(oldCards);
    console.log(data);
    onOClose();
  };
  const confirmPayment = () => {
    if (origem === 'plans') {
      const methodFilter = cards.find(
        (card) => card.cardNumber === cardChecked,
      );
      console.log(methodFilter);
      addMethodPayment(methodFilter);
      return navigation.navigate('PlanConfirm');
    }
    return navigation.navigate('FinishedOrder');
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
          {cards.map((card) => {
            return (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <CheckBox
                    title={
                      <TitleCard
                        cardValid={card.cardValid}
                        cardName={card.cardName}
                        cardNumber={card.cardNumber}
                      />
                    }
                    textStyle={{ color: '#fff' }}
                    checkedColor={colors.primary}
                    uncheckedColor={colors.primary}
                    containerStyle={{
                      backgroundColor: 'transparent',
                      borderColor: 'transparent',
                    }}
                    checked={cardChecked === card.cardNumber}
                    onPress={() => {
                      setCardChecked(card.cardNumber);
                    }}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Divider style={{ backgroundColor: '#fff' }} />
                </View>
              </View>
            );
          })}

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
        <ModalPaymentMethod onSave={onSave} onOClose={onOClose} />
      </Modalize>
    </View>
  );
}

const mapStateToProps = ({ plan }) => ({
  plan,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...PlanActions,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethod);
