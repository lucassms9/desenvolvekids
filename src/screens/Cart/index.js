import React from 'react';
import { View, SafeAreaView, Platform, StyleSheet, Text } from 'react-native';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';

import Header from '~/components/Header';
import { commons } from '~/styles';

import styles from './styles';

function Cart() {
  return (
    <View style={commons.body}>
      <Header title="Carrinho" hasBack />
      <SafeAreaView>
        <View style={[commons.container, { paddingBottom: 70 }]}>
          <Text>as</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Cart;
