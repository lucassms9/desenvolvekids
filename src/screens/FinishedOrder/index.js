import React from 'react';

import { View, SafeAreaView, Platform, StyleSheet, Text } from 'react-native';

import Header from '~/components/Header';
import { commons } from '~/styles';

function FinishedOrder() {
  return (
    <View style={commons.body}>
      <Header title="Finalizar Compra" hasBack />
      <SafeAreaView>
        <View style={[commons.container, { paddingBottom: 70 }]}>
          <Text>as</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default FinishedOrder;
