import React, { useEffect, useState } from 'react';

import { SafeAreaView, ScrollView, View, Text } from 'react-native';

import Header from '~/components/Header';
import MainCarousel from '~/components/MainCarousel';
import { commons, colors } from '~/styles';

function Detail({ navigation, route }) {
  const { tip } = route.params;

  return (
    <ScrollView style={[commons.body, {
      backgroundColor: '#fff'
    }]}>
      <Header title="Dicas" hasBack />

      <View style={[commons.container, { paddingBottom: 70, flex: 1 }]}>

        <View style={{
       
          marginLeft: 5,
          justifyContent: 'center',
        }}>
          <MainCarousel imagens={tip.imagens} />
        </View>

        <View style={{ marginHorizontal: 8, flex: 1 }}>
          <Text
            style={{
              textAlign: 'left',
              fontSize: 18,
              fontWeight: '700',
              marginBottom: 10,
            }}>
            {tip.titulo}
          </Text>
          <Text style={{ textAlign: 'justify' }}>
            {tip.descricao_completa}
          </Text>
        </View>

      </View>

    </ScrollView>
  );
}

export default Detail;
