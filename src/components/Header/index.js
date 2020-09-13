import React from 'react';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import { Header } from 'react-native-elements';
import { colors, commons } from '~/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';

function HeaderComponent({ title, hasBack }) {
  const navigation = useNavigation();

  const leftComp = hasBack ? (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Feather name="arrow-left" size={30} color={colors.white} />
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
      rightComponent={
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Feather name="user" size={30} color={colors.white} />
        </TouchableOpacity>
      }
      barStyle="light-content"
    />
  );
}

export default HeaderComponent;
