import React, { useState, useEffect } from 'react';

import {
  View,
  SafeAreaView,
  Platform,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Divider, CheckBox } from 'react-native-elements';
import { ToastActionsCreators } from 'react-native-redux-toast';
import { CommonActions } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Creators as OrderActions } from '~/store/ducks/order';
import { Creators as ProductActions } from '~/store/ducks/product';

import Header from '~/components/Header';
import ButtonPrimary from '~/components/ButtonPrimary';
import CartItemsConfim from '~/components/CartItemsConfim';
import TitleCard from '~/components/TitleCard';
import TitleWay from '~/components/TitleWay';
import generateCardHash from 'react-native-pagarme-card-hash';
import { ENCRYPTION_KEY } from '~/config/constantes';

import api from '~/services/api';

import { commons, colors } from '~/styles';
import { maskMoney } from '~/helpers/index';

function FinishedOrder({ navigation }) {
  const [installment, setInstallment] = useState(null);
  const [installments, setInstallments] = useState([{ label: '', value: '' }]);
  const [loading, setLoading] = useState(false);
  const [wayChecked, setWayChecked] = useState(false);
  const [wayCheckedValue, setWayCheckedValue] = useState(false);
  const orderParam = useSelector((state) => state.order);

  const dispatch = useDispatch();

  const handleWayCheck = (way) => {
    setWayChecked(way.entregas_id);
    setWayCheckedValue(way.valor);
  };

  const productsCart = useSelector((state) => state.product.cart.products);
  const total = productsCart.reduce((soma, prod) => {
    return prod.count * prod.preco + soma;
  }, 0);

  const confirmOrder = async () => {
    try {
      if (!wayChecked) {
        return dispatch(
          ToastActionsCreators.displayError(
            'Selecione uma forma de entrega',
            5000,
          ),
        );
      }
      setLoading(true);
      const handleProdutc = productsCart.map((p) => ({
        produtos_id: p.id,
        quantidade: p.count,
        valor: p.count * p.preco,
      }));
      console.log(orderParam);
      const wayFilter = orderParam.deliveryWays.find(
        (way) => way.entregas_id === wayChecked,
      );

      const dataSend = {
        products: handleProdutc,
        enderecoId: orderParam.deliveryMethod.id,
        entregaId: wayFilter.entregas_id,
        valor_frete: wayFilter.valor,
        forma_pagmento: orderParam.paymentMethod,
        promocode: '',
        parcela: installment,
      };

      if (orderParam.paymentMethod !== 'boleto') {
        const hash = await generateCardHash(
          {
            number: orderParam.paymentMethod.cardNumber,
            holderName: orderParam.paymentMethod.cardName,
            expirationDate: orderParam.paymentMethod.cardValid,
            cvv: orderParam.paymentMethod.cardCode,
          },
          ENCRYPTION_KEY,
        );

        dataSend.hash = hash;
      }

      const res = await api.post('pedidos/pagamento', dataSend);

      dispatch(
        ToastActionsCreators.displayInfo('Pedido realizado com sucesso'),
      );

      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'Store' }],
        }),
      );
      navigation.navigate('Store');

      dispatch(ProductActions.resetCart());
      dispatch(OrderActions.resetOrder());

      setLoading(false);
      //fazendo pagamento
    } catch (error) {
      setLoading(false);
      return dispatch(ToastActionsCreators.displayError(error.message, 5000));
    }
  };

  const fetchInstallments = async () => {
    try {
      const res = await api.post('pedidos/calc-parcelas', {
        orderValue: total + wayCheckedValue,
      });

      const install = res.parcelas.map((ins) => ({
        label: `${maskMoney(ins.valor)} - ${ins.qtd}x`,
        value: String(ins.qtd),
      }));

      setInstallments(install);
    } catch (error) {
      return dispatch(ToastActionsCreators.displayError(error.message, 5000));
    }
  };

  useEffect(() => {
    fetchInstallments();
  }, []);

  return (
    <View style={commons.body}>
      <Header title="Finalizar Compra" hasBack />
      <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
        <ScrollView>
          <View style={[commons.container, { flex: 1 }]}>
            <View style={{ padding: 15 }}>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>
                Produtos
              </Text>

              {productsCart.map((product) => (
                <CartItemsConfim product={product} />
              ))}

              <View style={{ flex: 1 }}>
                <Divider style={{ backgroundColor: '#fff' }} />
              </View>
            </View>
            <View style={{ padding: 15 }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: 18,
                  fontWeight: '700',
                  marginBottom: 15,
                }}>
                Forma de Entrega
              </Text>
              <View style={{}}>
                <View>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: '500',
                    }}>
                    Endereço Selecionado:{' '}
                    {orderParam.deliveryMethod.nome_endereco}
                  </Text>
                </View>
                {orderParam.deliveryWays.map((way) => {
                  console.log(way);
                  return (
                    <>
                      <View style={{}}>
                        <CheckBox
                          title={
                            <TitleWay
                              wayName={way.nome}
                              wayValue={way.valor}
                              wayDeadline={way.prazo}
                            />
                          }
                          textStyle={{ color: '#fff' }}
                          checkedColor={colors.primary}
                          uncheckedColor={colors.primary}
                          containerStyle={{
                            backgroundColor: 'transparent',
                            borderColor: 'transparent',
                          }}
                          checked={wayChecked === way.entregas_id}
                          onPress={() => {
                            handleWayCheck(way);
                          }}
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Divider style={{ backgroundColor: '#fff' }} />
                      </View>
                    </>
                  );
                })}
              </View>
              <View style={{ flex: 1 }}>
                <Divider style={{ backgroundColor: '#fff' }} />
              </View>
            </View>
            <View style={{ padding: 15 }}>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>
                Forma de Pagamento
              </Text>
              <View>
                {orderParam.paymentMethod === 'boleto' ? (
                  <Text
                    style={{
                      color: '#fff',
                      marginVertical: 10,
                      fontWeight: '500',
                    }}>
                    Boleto Bancário
                  </Text>
                ) : (
                  <TitleCard
                    cardValid={orderParam.paymentMethod.cardValid}
                    cardName={orderParam.paymentMethod.cardName}
                    cardNumber={orderParam.paymentMethod.cardNumber}
                  />
                )}
              </View>
              <View style={{ flex: 1 }}>
                <Divider style={{ backgroundColor: '#fff' }} />
              </View>
              {orderParam.paymentMethod !== 'boleto' && (
                <View style={{ padding: 15 }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 18,
                      fontWeight: '700',
                      marginBottom: 15,
                    }}>
                    Parcelas
                  </Text>
                  <RNPickerSelect
                    onValueChange={(text) => setInstallment(text)}
                    value={installment}
                    items={installments}
                    placeholder={{
                      label: 'Escolha',
                      value: null,
                      color: '#9EA0A4',
                    }}
                    style={{
                      ...pickerSelectStyles,
                      iconContainer: {
                        top: 10,
                        right: 10,
                      },
                    }}
                    useNativeAndroidPickerStyle={false}
                    textInputProps={{ underlineColor: 'yellow' }}
                    Icon={() => {
                      return (
                        <Ionicons name="md-arrow-down" size={24} color="gray" />
                      );
                    }}
                  />
                </View>
              )}
            </View>
            <View style={{ marginHorizontal: 15 }}>
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                  paddingBottom: 10,
                  marginHorizontal: 10,
                }}>
                <View>
                  <Text
                    style={{ color: '#fff', fontSize: 16, marginVertical: 5 }}>
                    Frete:
                    {maskMoney(wayCheckedValue)}
                  </Text>
                </View>
                <View>
                  <Text style={{ color: '#fff', fontSize: 16 }}>
                    Total:
                    {maskMoney(total + wayCheckedValue)}
                  </Text>
                </View>
              </View>
              <ButtonPrimary
                loading={loading}
                onPress={confirmOrder}
                text="CONCLUIR PEDIDO"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginBottom: 20,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: '#fff',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: '#fff',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default FinishedOrder;
