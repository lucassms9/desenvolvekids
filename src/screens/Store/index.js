import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from '~/store/ducks/auth';
import { Creators as ProductActions } from '~store/ducks/product';
import { SafeAreaView, View, FlatList } from 'react-native';

import Header from '~/components/Header';
import Loader from '~/components/Loader';
import TryAgain from '~/components/TryAgain';
import ProductCard from '~/components/ProductCard';

import { commons } from '~/styles';
import styles from './styles';

function Store(props) {
  const { navigation, productsRequest, status, products } = props;
  const productList = [...products];

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('focado na screen store');
      productsRequest();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    productsRequest();
  }, []);

  const columns = 2;

  const createRows = (data, columnsParam) => {
    const rows = Math.floor(data.length / columnsParam); // [A]
    let lastRowElements = data.length - rows * columnsParam; // [B]
    while (lastRowElements !== columnsParam) {
      // [C]
      data.push({
        // [D]
        id: `empty-${lastRowElements}`,
        name: `empty-${lastRowElements}`,
        empty: true,
      });
      lastRowElements += 1; // [E]
    }
    return data; // [F]
  };
  console.log(status);
  return (
    <View style={commons.body}>
      <Header title="Loja" showIconCart />
      <SafeAreaView>
        <View style={[commons.container, { paddingBottom: 70 }]}>
          {status === 'loading' && <Loader />}
          {status === 'error' && <TryAgain tryAgain={productsRequest} />}

          <FlatList
            data={createRows(productList, columns)}
            keyExtractor={(product) => product.id}
            numColumns={2} // Número de colunas
            renderItem={(product) => {
              if (product.empty) {
                return <View style={[styles.item, styles.itemEmpty]} />;
              }
              return (
                <ProductCard product={product.item} navigation={navigation} />
              );
            }}
          />
        </View>
      </SafeAreaView>
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
      // ...AuthActions,
      ...ProductActions,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Store);
