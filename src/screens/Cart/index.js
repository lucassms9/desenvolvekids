import React, { useEffect, useMemo } from 'react';
import { View, SafeAreaView, FlatList, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { maskMoney } from '~/helpers';

import Header from '~/components/Header';
import CartItems from '~/components/CartItems';
import ButtonPrimary from '~/components/ButtonPrimary';

import { commons } from '~/styles';

import styles from './styles';

function Cart({ navigation }) {
  const confirmOrder = () => {
    navigation.navigate('DeliveryInfo');
  };

  const productsCart = useSelector((state) => state.product.cart.products);

  const total = productsCart.reduce((soma, prod) => {
    return prod.count * prod.preco + soma;
  }, 0);

  return (
    <View style={commons.body}>
      <Header title="Carrinho" hasBack />
      <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
        <View style={[commons.container, styles.containerPlus]}>
          <View style={{ height: '92%' }}>
            <FlatList
              data={productsCart}
              keyExtractor={(product) => product.id}
              renderItem={(product) => {
                return (
                  <CartItems product={product.item} navigation={navigation} />
                );
              }}
            />
          </View>
          <View>
            <View style={styles.cartItem}>
              <Text style={styles.cartTxt}>Total: {maskMoney(total)}</Text>
            </View>
            <ButtonPrimary onPress={confirmOrder} text="COMPRAR" />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Cart;
