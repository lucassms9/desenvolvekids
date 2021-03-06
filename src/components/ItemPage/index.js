import React, { memo } from 'react';

import { View, Text, Image } from 'react-native';

import PlayerCustom from '~/components/PlayerCustom';

function ItemPage({ item }) {
  const renderImage = (image) => {
    return (
      <View style={{ marginVertical: 15, marginBottom:20 }}>
        <Image resizeMode='contain' source={{ uri: image.conteudo }} style={{ width: '100%', minHeight:250}} />
      </View>
    );
  };
  const renderMovies = (movie) => { 
    return (
      <View style={{ marginVertical: 15,marginBottom:20  }}>
        <PlayerCustom uriVideo={item.conteudo} />
      </View>
    );
  };

  const renderText = (text) => {
    return (
      <View style={{marginBottom:20 }}>
        <Text style={{ fontSize: 14,  textAlign: 'justify' }}>
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
  if (item.tipo === 'imagem') {
    return renderImage(item);
  }
  return <View />;
}

export default memo(ItemPage);
