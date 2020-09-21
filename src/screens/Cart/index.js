import React, { useEffect, useMemo } from 'react';
import { View, SafeAreaView, FlatList, StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';

import Header from '~/components/Header';
import CartItems from '~/components/CartItems';
import ButtonPrimary from '~/components/ButtonPrimary';

import { commons } from '~/styles';

import styles from './styles';

function Cart({ navigation }) {
  const confirmOrder = () => {};

  const productsCart = useSelector((state) => state.cart.products);
  const products = useSelector((state) => state.product.products);

  const handleProducts = productsCart.map((prod) => {
    const find = products.find((prodF) => prodF.id === prod.id);
    if (find) {
      return {
        ...find,
        count: prod.count,
      };
    }
  });

  const total = 50;
  // const total = useEffect(() => {
  //   const value = handleProducts.reduce((soma, product) => {
  //     return product.preco + soma;
  //   }, 0);
  //   return value;
  // }, [handleProducts]);

  return (
    <View style={commons.body}>
      <Header title="Carrinho" hasBack />
      <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
        <View
          style={[
            commons.container,
            { paddingBottom: 70, flexDirection: 'column' },
          ]}>
          <View style={{ height: '94%' }}>
            <FlatList
              data={handleProducts}
              keyExtractor={(product) => product.id}
              renderItem={(product) => {
                return (
                  <CartItems product={product.item} navigation={navigation} />
                );
              }}
            />
          </View>
          <View>
            <View>
              <Text style={{ color: '#fff' }}>Total: {total}</Text>
            </View>
            <ButtonPrimary onPress={confirmOrder} text="Confirmar" />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Cart;
