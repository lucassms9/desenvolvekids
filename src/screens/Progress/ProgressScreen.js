import React from 'react';
import { View, Text } from 'react-native';

import ProgregressBar from '~/components/ProgregressBar';

const ProgressScreen = () => (
  <View style={{ marginTop: 15 }}>
    <View style={{ backgroundColor: '#fff', borderRadius: 5, padding: 10 }}>
      <View>
        <Text style={{ fontSize: 18 }}>Area Fisica</Text>
      </View>
      <View style={{ justifyContent:'center', alignItems:'center' }}>
        <ProgregressBar />
      </View>
    </View>
  </View>
);

export default ProgressScreen;
