import React, { useMemo } from 'react';

import { View, Text, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon, CheckBox } from 'react-native-elements';

import {
  Card,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';

import style from './style';
import { commons, colors } from '~/styles';
import iconPlay from '~/assets/images/botao-play.png';

function MainCard({
  id,
  activityId,
  banner,
  title,
  desc,
  isFavorite,
  goDetail,
  isSchecule,
  toggleFavorite,
  progress,
  completed,
  checkedAcitivity,
  setCheckedAcitivity,
  showFavorite = false,
  showPlay = false,
  stateMaterial,
  icon,
  origin,
  minAge = '0 - 0',
  titleButton = 'VER MAIS',
}) {
  // console.log(checkedAcitivity)
  // console.log(checkedAcitivity.includes(id))
  const getSubTitle = (text, desc) => {
    let textHandle = desc || text;

    if (String(textHandle).length > 100) {
      return `${textHandle.substring(0, 100)} ...`;
    }

    return textHandle;
  };

  var width = Dimensions.get('window').width;

  const styleButton = useMemo(() => {
    if(showPlay){
      return {
        marginTop:15,
        borderRadius: 4,
        width: 100,
        height: 35,
        backgroundColor: '#22AAB6',
        justifyContent: 'center',
        alignItems: 'center',
      }
    }
    return {
      borderRadius: 4,
      width: 100,
      height: 50,
      backgroundColor: '#22AAB6',
      justifyContent: 'center',
      alignItems: 'center',
    }
  },showPlay);
  return (
    <View
      style={{ flex: 1, width: width * 0.9, height: 400, alignSelf: 'center', marginBottom: 10 }}>
      <View
        key={id}
        style={[style.container, { position: 'absolute', width: '100%' }]}>
        <View style={{ zIndex: 999, elevation: 9999999999999 }}>
          <Image
            style={{
              position: 'absolute',
              top: -10,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              right: -20,
              borderRadius: 20,
              width: 65,
              height: 65,
            }}
            resizeMode="contain"
            source={{ uri: icon }}
          />
        </View>

        {completed && (
          <View style={{ zIndex: 1, elevation: 1 }}>
            {/* <View
            style={{
              position: 'absolute',
              top: 10,
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              left: 5,
              borderColor: '#0f0',
              borderWidth: 2,
              borderRadius: 20,
              width: 30,
              height: 30,
            }}>
            <Icon name="check" type="feather" color="#0f0" />
          </View> */}
          </View>
        )}
        {stateMaterial && stateMaterial === 'completeList' && (
          <View style={{ zIndex: 1, elevation: 1 }}>
            <View
              style={{
                position: 'absolute',
                top: 2,
                flex: 1,
                left: 2,
              }}>
              <TouchableOpacity
                onPress={() => {
                  let handleItem = [];
                  if (!checkedAcitivity.includes(id)) {
                    handleItem = [...checkedAcitivity, id];
                  } else {
                    handleItem = checkedAcitivity.filter((item) => item !== id);
                  }
                  console.log(handleItem);
                  setCheckedAcitivity(handleItem);
                }}>
                <CheckBox
                  title={''}
                  textStyle={style.colorItem}
                  checkedColor={colors.primary}
                  uncheckedColor={colors.primary}
                  containerStyle={style.checkBox}
                  onPress={() => { }}
                  checked={checkedAcitivity.includes(id)}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={[style.fx1, { zIndex: 0, justifyContent: 'center', alignItems:'center' }]}>
          {showPlay && (
            <Image source={iconPlay} style={{ position: 'absolute', zIndex: 1, alignSelf: 'center', }} />
          )}


          <Image
            source={{ uri: banner }}
            resizeMode="stretch"
            style={[style.image,{
              marginLeft:7
            }]}></Image>
        </View>

        <View style={style.content}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View>
              <Text style={style.title}>{title}</Text>
            </View>
            <View style={{ marginTop: 10 }}>
              {title && <Text style={{ textAlign: 'center' }}>{getSubTitle(title, desc)}</Text>}
            </View>
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: origin === 'atividades' ? 'space-between' : 'center' }}>
          <View>
            <TouchableOpacity
              style={styleButton}
              onPress={goDetail}>
              <View>
                <Text
                  style={{ color: '#fff', fontWeight: '600', fontSize: 16 }}>
                  Veja Mais
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 15 }}>
            {showFavorite && (
              <View style={{ flexDirection: 'row' }}>
                {isSchecule && (
                  <View style={{ marginRight: 15 }}>
                    {/* <Icon name={'clock'} type="feather" color={'#f00'} size={20} /> */}
                    <Text> {isSchecule}</Text>
                  </View>
                )}

                <View style={{ marginHorizontal: 15 }}>
                  <View
                    style={{
                      backgroundColor: '#003047',
                      borderRadius: 4,
                      width: 60,
                      height: 35,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}>
                    <Text style={{ color: '#fff',fontSize:17 }}>{minAge}</Text>
                  </View>
                </View>

                <View style={{ marginTop: 5 }}>
                  <Text style={{fontSize:17}}>{progress}</Text>
                </View>
                <TouchableOpacity
                  style={{ marginHorizontal: 15, marginTop: 5 }}
                  onPress={() => toggleFavorite(id)}>
                  <Icon
                    name={isFavorite ? 'heart' : 'heart-o'}
                    type="font-awesome"
                    color={'#f00'}
                    size={22}
                  />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
}

export default MainCard;
