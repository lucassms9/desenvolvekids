import React from 'react';
import { View, Text } from 'react-native';

function NotFound({ type }) {
  return (
    <View style={{ alignItems: 'center', marginTop: 15 }}>
      <Text style={{ color: '#fff' }}>{`Nenhum ${type} encontrado.`}</Text>
    </View>
  );
}

export default NotFound;
