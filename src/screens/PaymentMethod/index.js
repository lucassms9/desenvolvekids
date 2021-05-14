import React, { useState, useRef, useEffect } from 'react';

import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
} from 'react-native';
import { CheckBox, Divider } from 'react-native-elements';
import { connect, useDispatch } from 'react-redux';

import { Creators as PlanActions } from '~/store/ducks/plan';
import { Creators as OrderActions } from '~/store/ducks/order';

import { bindActionCreators } from 'redux';
import { ToastActionsCreators } from 'react-native-redux-toast';

import Header from '~/components/Header';
import ModalPaymentMethod from '~/components/ModalPaymentMethod';
import ButtonPrimary from '~/components/ButtonPrimary';
import ButtonSecondary from '~/components/ButtonSecondary';
import TitleCard from '~/components/TitleCard';
import { Modalize } from 'react-native-modalize';
import { commons } from '~/styles';

import styles from './styles';
import { colors } from '~/styles/index';

function PaymentMethod({
  navigation,
  route,
  addMethodPayment,
  plan,
  addPaymentMethod,
}) {
  const { origem } = route.params;
  const modalizeRef = useRef(null);
  const dispatch = useDispatch();

  const [heightModal, setHeightModal] = useState(0);
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
    setCardChecked(data.cardNumber);
    console.log(data);
    onOClose();
  };

  const confirmPayment = () => {
    if (!cardChecked) {
      return dispatch(
        ToastActionsCreators.displayError(
          'Cadastre e escolha um cartão para continuar',
          5000,
        ),
      );
    }

    const methodFilter = cards.find((card) => card.cardNumber === cardChecked);

    if (origem === 'plans') {
      addMethodPayment(methodFilter);
      return navigation.navigate('PlanConfirm');
    }

    if (origem === 'store') {
      addPaymentMethod(cardChecked !== 'boleto' ? methodFilter : cardChecked);
      return navigation.navigate('FinishedOrder');
    }
  };

  useEffect(() => {
    const percent = Dimensions.get('window').height * 0.80;
    console.log(percent);
    setHeightModal(percent);
  }, []);

  return (
    <View style={commons.body}>
      <Header title="Forma de Pagamento" hasBack />
      <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
        <ScrollView style={[commons.container, { flex: 1 }]}>
          <View style={{ padding: 15 }}>
            <Text style={{ color: '#000', fontSize: 18, fontWeight: '700' }}>
              Forma de pagamento
            </Text>
          </View>
          <View>
            {origem === 'store' && (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <CheckBox
                    title="Boleto"
                    textStyle={{ color: '#000', fontSize: 16 }}
                    checkedColor={colors.primary}
                    uncheckedColor={colors.primary}
                    containerStyle={{
                      backgroundColor: 'transparent',
                      borderColor: 'transparent',
                    }}
                    checked={cardChecked === 'boleto'}
                    onPress={() => {
                      setCardChecked('boleto');
                    }}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Divider style={{ backgroundColor: '#000' }} />
                </View>
              </>
            )}
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
                    textStyle={{ color: '#000' }}
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
                  <Divider style={{ backgroundColor: '#000' }} />
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
      <Modalize modalHeight={heightModal} ref={modalizeRef}>
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
      ...OrderActions,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(PaymentMethod);
