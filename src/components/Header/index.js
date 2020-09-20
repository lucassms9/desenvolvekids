import React from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Header, Badge } from 'react-native-elements';
import { colors, commons } from '~/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

function HeaderComponent({ title, hasBack, hasntProfile, showIconCart }) {
  const navigation = useNavigation();

  let leftComp = hasBack ? (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Feather name="arrow-left" size={30} color={colors.white} />
    </TouchableOpacity>
  ) : (
    {}
  );

  if (!hasBack && showIconCart) {
    leftComp = (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Cart');
        }}>
        <MaterialCommunityIcons
          name="cart-outline"
          size={30}
          color={colors.white}
        />
        <Badge
          badgeStyle={{ backgroundColor: colors.primary }}
          value="2"
          containerStyle={{ position: 'absolute', top: -4, right: -4 }}
        />
      </TouchableOpacity>
    );
  }
  console.log(leftComp);
  const rightComp = !hasntProfile ? (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Profile');
      }}>
      <Feather name="user" size={30} color={colors.white} />
    </TouchableOpacity>
  ) : (
    {}
  );
  return (
    <Header
      ViewComponent={LinearGradient} // Don't forget this!
      linearGradientProps={{
        colors: ['#060E21', '#003048'],
        start: { x: 0, y: 0 },
        end: { x: 1, y: 0 },
      }}
      placement="center"
      leftComponent={leftComp}
      centerComponent={{
        text: title,
        style: { color: colors.white, ...commons.pageTitle },
      }}
      containerStyle={{ borderBottomWidth: 0 }}
      rightComponent={rightComp}
      barStyle="light-content"
    />
  );
}

export default HeaderComponent;
