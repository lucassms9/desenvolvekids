import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

import { Image } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { maskMoney } from '~/helpers';
import styles from './styles';

function ProductCard({ product, navigation }) {
  const goProduct = (productId) => {
    navigation.navigate('Product', {
      productId,
    });
  };
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
              source={{ uri: product.miniatura }}
              style={{ width: 130, height: 110 }}
              PlaceholderContent={<ActivityIndicator />}
            />
          </View>
          <View style={{ marginHorizontal: 10 }}>
            <Text numberOfLines={1} style={{ marginBottom: 5 }}>
              {product.nome}
            </Text>
            {product.hasDiscount ? (
              <View>
                <Text
                  style={{
                    textDecorationLine: 'line-through',
                    textDecorationStyle: 'solid',
                    fontSize: 13,
                  }}>
                  {maskMoney(product.preco_original)}
                </Text>
                <Text style={{ fontSize: 15 }}>{maskMoney(product.preco)}</Text>
              </View>
            ) : (
              <Text style={{ fontSize: 15 }}>{maskMoney(product.preco)}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default ProductCard;
