import React from 'react';

import {
  View,
  SafeAreaView,
  Platform,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Divider } from 'react-native-elements';

import Header from '~/components/Header';
import ButtonPrimary from '~/components/ButtonPrimary';
import CartItemsConfim from '~/components/CartItemsConfim';
import TitleCard from '~/components/TitleCard';

import { commons } from '~/styles';

function FinishedOrder() {
  const orderParam = useSelector((state) => state.order);
  console.log(orderParam);
  const productsCart = useSelector((state) => state.product.cart.products);
  const total = productsCart.reduce((soma, prod) => {
    return prod.count * prod.preco + soma;
  }, 0);

  const confirmAddres = () => {};

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
              <View>
                <Text style={{ color: '#fff' }}>
                  estrada municpal bairro pinhal,2551 Boituva - SP
                </Text>
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
                <TitleCard />
              </View>
              <View style={{ flex: 1 }}>
                <Divider style={{ backgroundColor: '#fff' }} />
              </View>
            </View>
            <View style={{ margin: 15 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  paddingBottom: 10,
                  marginHorizontal: 10,
                }}>
                <Text style={{ color: '#fff', fontSize: 16 }}>
                  Total:{' '}
                  {total.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </Text>
              </View>
              <ButtonPrimary onPress={confirmAddres} text="CONCLUIR PEDIDO" />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default FinishedOrder;
