import React from 'react';

import { View, Text } from 'react-native';
import { maskMoney } from '~/helpers';

function TitleCard({ wayName, wayValue, wayDeadline, styles = {} }) {
  return (
    <View style={{ paddingHorizontal: 10, ...styles }}>
      <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
        Serviço: {wayName}
      </Text>
      <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
        Valor: {maskMoney(wayValue)}
      </Text>
      <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
        Prazo: {wayDeadline} dias úteis
      </Text>
    </View>
  );
}

export default TitleCard;
