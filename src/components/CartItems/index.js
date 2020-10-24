import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as ProductActions } from '~/store/ducks/product';
import { View, ActivityIndicator, Text } from 'react-native';
import { Image } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Feather from 'react-native-vector-icons/Feather';
import { maskMoney } from '~/helpers';
import styles from './styles';

function CartItems({ product, decreaseProduct, addProduct }) {
  return (
    <View style={styles.item}>
      <View style={{ flex: 1 }}>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Image
            resizeMode="contain"
            source={{ uri: product.miniatura }}
            style={{ width: 100, height: 130 }}
            PlaceholderContent={<ActivityIndicator />}
          />
        </View>

        <View style={{ marginHorizontal: 10 }}>
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
      <View style={{ flex: 1.5 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 2 }}>
            <View style={{ marginTop: 10 }}>
              <Text style={{ fontSize: 19, marginBottom: 5 }}>
                {product.nome}
              </Text>
              <Text numberOfLines={2}>{product.descricao}</Text>
            </View>
            <View style={{ marginTop: 15, flexDirection: 'row' }}>
              <Text>Total: {maskMoney(product.preco * product.count)}</Text>
            </View>
          </View>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <View>
              <TouchableOpacity
                onPress={() => {
                  decreaseProduct(product.id);
                }}>
                <Feather name="minus-circle" size={20} color={'#000'} />
              </TouchableOpacity>
            </View>
            <View style={{ marginHorizontal: 10 }}>
              <Text>{product.count}</Text>
            </View>
            <View>
              <TouchableOpacity
                onPress={() => {
                  addProduct(product.id, 1);
                }}>
                <Feather name="plus-circle" size={20} color={'#000'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const mapStateToProps = ({ product }) => ({
  products: product.products,
  status: product.status,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...ProductActions,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(CartItems);
