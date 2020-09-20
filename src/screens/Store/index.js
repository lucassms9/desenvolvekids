import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from '~/store/ducks/auth';
import { Creators as ProductActions } from '~store/ducks/product';
import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import { Image, Button, Icon } from 'react-native-elements';

import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';

import Header from '~/components/Header';
import Loader from '~/components/Loader';
import TryAgain from '~/components/TryAgain';

import { commons } from '~/styles';

function Store(props) {
  const { navigation, productsRequest, status, products } = props;

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

  return (
    <View style={commons.body}>
      <Header title="Loja" showIconCart />
      <SafeAreaView>
        <View style={[commons.container, { paddingBottom: 70 }]}>
          <ScrollView>
            {status === 'loading' && <Loader />}
            {status === 'error' && <TryAgain tryAgain={productsRequest} />}
            {products.map((u, i) => {
              return (
                <View
                  key={i}
                  style={{
                    backgroundColor: '#fff',
                    height: 250,
                    marginBottom: 15,
                  }}>
                  <Card>
                    <CardImage
                      source={{ uri: 'http://placehold.it/480x270' }}
                      title="Above all i am here"
                    />
                    <CardContent
                      style={{ flex: 0 }}
                      text="Your device will reboot in few seconds once successful, be patient meanwhile"
                    />
                    <CardAction separator={true} inColumn={false}>
                      <CardButton
                        onPress={() => {}}
                        title="ASSISTIR"
                        color="blue"
                      />
                    </CardAction>
                  </Card>
                </View>
              );
            })}
          </ScrollView>
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
      ...AuthActions,
      ...ProductActions,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Store);
