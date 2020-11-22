import React, { memo } from 'react';

import { View, Text } from 'react-native';

function ItemPage({ item }) {
  const renderMovies = (movie) => {
    return (
      <View>
        <Text>movies</Text>
      </View>
    );
  };

  const renderText = (text) => {
    return (
      <View>
        <Text>text</Text>
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
