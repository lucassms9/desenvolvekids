import React from 'react';
import { View, SafeAreaView, Platform, StyleSheet, Text } from 'react-native';

import Header from '~/components/Header';
import { commons } from '~/styles';

function Product({ route, navigation }) {
  const { productId } = route.params;
  console.log(productId);
  return (
    <View style={commons.body}>
      <Header title="Produto name" hasBack />
      <SafeAreaView>
        <View style={[commons.container, { paddingBottom: 70 }]}>
          <Text>as</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Product;
