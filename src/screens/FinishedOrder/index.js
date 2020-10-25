import React, { useState } from 'react';

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

import { Creators as OrderActions } from '~/store/ducks/order';
import { Creators as ProductActions } from '~/store/ducks/product';

import Header from '~/components/Header';
import ButtonPrimary from '~/components/ButtonPrimary';
import CartItemsConfim from '~/components/CartItemsConfim';
import TitleCard from '~/components/TitleCard';
import TitleWay from '~/components/TitleWay';

import api from '~/services/api';

import { commons, colors } from '~/styles';
import { maskMoney } from '~/helpers/index';

function FinishedOrder({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [wayChecked, setWayChecked] = useState(false);
  const [wayCheckedValue, setWayCheckedValue] = useState(false);
  const orderParam = useSelector((state) => state.order);
  console.log(orderParam);
  const dispatch = useDispatch();

  const handleWayCheck = (way) => {
    setWayChecked(way.entregas_id);
    setWayCheckedValue(way.valor);
  };

  const productsCart = useSelector((state) => state.product.cart.products);
  console.log(productsCart);
  const total = productsCart.reduce((soma, prod) => {
    return prod.count * prod.preco + soma;
  }, 0);

  const confirmAddres = async () => {
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
      const wayFilter = orderParam.deliveryWays.find(
        (way) => way.entregas_id === wayChecked,
      );

      const res = await api.post('pedidos/pagamento', {
        products: handleProdutc,
        enderecoId: orderParam.deliveryMethod.id,
        entregaId: wayFilter.entregas_id,
        valor_frete: wayFilter.valor,
        forma_pagmento: orderParam.paymentMethod,
        promocode: '',
      });

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
                onPress={confirmAddres}
                text="CONCLUIR PEDIDO"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default FinishedOrder;
