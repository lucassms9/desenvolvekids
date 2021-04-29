import React, { useMemo } from 'react';
import { View, Text } from 'react-native';

// import { Container } from './styles';

const ProgregressBar = ({ percent }) => {
  const percentLabel = useMemo(() => {
    return (percent / 100) * 300;
  }, [percent]);

  console.log(percentLabel)
  return (
    <View style={{ width: 300 }}>
      <View style={{ marginBottom: 10 }}>
        <Text style={{ textAlign: 'center', color: '#000', fontSize: 18 }}>
          {`${percent}%`}
        </Text>
      </View>
      <View style={{ marginTop: 0 }}>
        <View
          style={{
            width: 300,
            height: 40,
            backgroundColor: '#eee',
            position: 'absolute',
          }}></View>
       
        <View
          style={{
            width: percentLabel,
            height: 40,

            backgroundColor: 'none',
            borderWidth: 20,
            borderColor: percentLabel > 0 ? '#0f0' : 'transparent',
          }}></View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text>0%</Text>
        <Text>100%</Text>
      </View>
    </View>
  );
};

export default ProgregressBar;
