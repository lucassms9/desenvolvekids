import React from 'react';
import { View, Text } from 'react-native';

// import { Container } from './styles';

const ProgregressBar = () => {
  return (
    <View style={{ width: 300,  }}>
      <View style={{ marginBottom: 10 }}>
        <Text style={{ textAlign: 'center', color: '#000', fontSize:18 }}>50%</Text>
      </View>
      <View style={{marginTop:0}}>
      <View
        style={{
          width: 300,
          height: 40,
          backgroundColor: '#eee',
          position: 'absolute',
        }}></View>

      <View
        style={{
          width: 150,
          height: 40,
          backgroundColor: 'none',
          borderWidth: 20,
          borderColor: '#0f0',
        }}></View>
      </View>
      <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <Text>0%</Text>
        <Text>100%</Text>
      </View>
    </View>
  );
};

export default ProgregressBar;
