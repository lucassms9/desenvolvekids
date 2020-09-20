import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import { Image } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { Card, CardContent } from 'react-native-material-cards';
import styles from './styles';

function ProductCard({ product, navigation }) {
  const goProduct = (productId) => {
    navigation.navigate('Product', {
      productId,
    });
  };
  console.log(product);
  if (product.empty) {
    return <View style={[styles.item, styles.itemEmpty]} />;
  }
  return (
    <View style={styles.item}>
      <TouchableOpacity
        onPress={() => {
          goProduct(product.id);
        }}>
        <View
          style={{
            flexDirection: 'column',
          }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Image
              resizeMode="contain"
              source={{ uri: product.imagem }}
              style={{ width: 100, height: 130 }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          <View style={{ marginHorizontal: 5 }}>
            <Text numberOfLines={1}>{product.nome}</Text>
            <Text>R$ {product.preco}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default ProductCard;
