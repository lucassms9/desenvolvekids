import React, { useEffect, useState } from 'react';

import { SafeAreaView, ScrollView, View, Text } from 'react-native';

import Header from '~/components/Header';
import MainCarousel from '~/components/MainCarousel';
import { commons, colors } from '~/styles';

function Detail({ navigation, route }) {
  const { tip } = route.params;

  return (
    <View style={commons.body}>
      <Header title="Dicas" hasBack />
      <SafeAreaView>
        <View style={[commons.container, { paddingBottom: 100 }]}>
          <ScrollView>
            <MainCarousel imagens={tip.imagens} />

            <View style={{ marginHorizontal: 8 }}>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'left',
                  fontSize: 18,
                  fontWeight: '700',
                  marginBottom: 10,
                }}>
                {tip.titulo}
              </Text>
              <Text style={{ color: '#fff', textAlign: 'justify' }}>
                {tip.descricao_completa}
              </Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Detail;
