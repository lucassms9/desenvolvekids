import React from 'react';

import { View, Text, Image } from 'react-native';

import {
  Card,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';

import style from './style';

function MainCard({
  id,
  banner,
  title,
  desc,
  goDetail,
  titleButton = 'VER MAIS',
}) {
  return (
    <View key={id} style={style.container}>
      <View style={style.fx1}>
        <Image
          source={{ uri: banner }}
          resizeMode="stretch"
          style={style.image}
        />
      </View>

      <CardContent
        style={style.content}
        text={
          <>
            <Text style={style.title}>
              {title}
              {desc && '\n\n'}
            </Text>
            {desc && <Text>{`${desc.substring(0, 120)} ...`}</Text>}
          </>
        }
      />
      <CardAction separator={true} inColumn={false}>
        <CardButton onPress={goDetail} title={titleButton} color="blue" />
      </CardAction>
    </View>
  );
}

export default MainCard;
