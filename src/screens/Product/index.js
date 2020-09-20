import React, { useEffect, useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Creators as CartActions } from '~/store/ducks/cart';

import Header from '~/components/Header';
import Loader from '~/components/Loader';
import TryAgain from '~/components/TryAgain';

import { commons } from '~/styles';
import { Image, Text } from 'react-native-elements';
import api from '~/services/api';
import ButtonPrimary from '~/components/ButtonPrimary';

function Product(props) {
  console.log(props);
  const { route, navigation, addProduct } = props;
  const { productId } = route.params;
  const [product, setProduct] = useState({});
  const [status, setStatus] = useState('');

  const addProductAct = () => {
    addProduct(productId);
    navigation.navigate('Cart');
  };

  const getProduct = async () => {
    try {
      setStatus('loading');
      const response = await api.get(`/products/${productId}`);
      setProduct(response);
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <View style={commons.body}>
      <Header title="Produto name" hasBack />
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={[
            commons.container,
            { paddingBottom: 70, backgroundColor: '#fff', flex: 1 },
          ]}>
          {status === 'loading' && <Loader />}
          {status === 'error' && <TryAgain tryAgain={getProduct} />}
          <View style={{ flex: 1 }}>
            <Image
              resizeMode="contain"
              style={{ width: 100, height: 130 }}
              source={{ uri: product.imagem }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Text h4>{product.nome}</Text>
            <Text>{product.descricao}</Text>
          </View>

          <View style={{ flex: 0.001, marginHorizontal: 15 }}>
            <ButtonPrimary onPress={addProductAct} text={'Comprar'} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const mapStateToProps = ({ cart }) => ({
  cart,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...CartActions,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Product);
