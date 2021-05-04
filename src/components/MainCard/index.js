import React from 'react';

import { View, Text, Image,Dimensions } from 'react-native';
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
  stateMaterial,
  icon,
  titleButton = 'VER MAIS',
}) {
  // console.log(checkedAcitivity)
  // console.log(checkedAcitivity.includes(id))
  console.log(id);
  var width = Dimensions.get('window').width; 
  return (
    <View style={{ width: (width * 0.90) , height: 600, alignSelf:'center' }}>
      <View key={id} style={[style.container, { position: 'absolute', width:'100%'}]}>
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
                  onPress={() => {}}
                  checked={checkedAcitivity.includes(id)}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={[style.fx1, { zIndex: 0 }]}>
          <Image
            source={{ uri: banner }}
            resizeMode="cover"
            style={style.image}></Image>
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
                  {/* <Icon name={'clock'} type="feather" color={'#f00'} size={20} /> */}
                  <Text> {isSchecule}</Text>
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
    </View>
  );
}

export default MainCard;
