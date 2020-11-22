import React, { memo } from 'react';

import { View, Text } from 'react-native';

import PlayerCustom from '~/components/PlayerCustom';

function ItemPage({ item }) {
  const renderMovies = (movie) => {
    return (
      <View style={{ marginVertical: 15 }}>
        <PlayerCustom uriVideo={item.conteudo} />
      </View>
    );
  };

  const renderText = (text) => {
    return (
      <View>
        <Text style={{ fontSize: 14, color: '#fff', textAlign: 'justify' }}>
          {text.conteudo}
        </Text>
      </View>
    );
  };

  if (item.tipo === 'texto') {
    return renderText(item);
  }
  if (item.tipo === 'video') {
    return renderMovies(item);
  }
  return <View />;
}

export default memo(ItemPage);
