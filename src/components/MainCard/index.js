import React from 'react';

import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
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
  isFavorite,
  goDetail,
  isSchecule,
  toggleFavorite,
  progress,
  showFavorite = false,
  titleButton = 'VER MAIS',
}) {
  return (
    <View key={id} style={style.container}>
      <View style={style.fx1}>
        <Image
          source={{ uri: banner }}
          resizeMode="cover"
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
      <CardAction
        separator={true}
        inColumn={false}
        style={{ flexDiferection: 'row', justifyContent: 'space-between' }}>
        <CardButton onPress={goDetail} title={titleButton} color="blue" />
        {showFavorite && (
          <View style={{ flexDirection: 'row' }}>
            {isSchecule && (
              <View style={{ marginRight: 15 }}>
                <Icon name={'clock'} type="feather" color={'#f00'} size={20} />
              </View>
            )}

            <View>
              <Text>{progress}</Text>
            </View>
            <TouchableOpacity
              style={{ marginHorizontal: 15 }}
              onPress={() => toggleFavorite(id)}>
              <Icon
                name={isFavorite ? 'heart' : 'heart-o'}
                type="font-awesome"
                color={'#f00'}
                size={20}
              />
            </TouchableOpacity>
          </View>
        )}
      </CardAction>
    </View>
  );
}

export default MainCard;
