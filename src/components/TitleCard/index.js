import React from 'react';

import { View, Text } from 'react-native';

function TitleCard({ cardName, cardNumber, cardValid, styles = {} }) {
  return (
    <View style={{ paddingHorizontal: 10, ...styles }}>
      <Text style={{ color: '#000', fontSize: 16, fontWeight: '600' }}>
        {cardNumber}
      </Text>
      <Text style={{ color: '#000', fontSize: 16, fontWeight: '600' }}>
        {cardName}
      </Text>
      <Text style={{ color: '#000', fontSize: 16, fontWeight: '600' }}>
        {cardValid}
      </Text>
    </View>
  );
}

export default TitleCard;
