import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { colors } from '~/styles';
import rocketImage from '~/assets/images/rocket.png';

function RocketAnimated() {
  const [endAnimate, setEndAnimate] = useState(false);
  const [bottomPosition, setBottomPosition] = useState(new Animated.Value(0));

  const navigation = useNavigation();

  const setCompleteAnimate = () => {
    setTimeout(() => {
      setEndAnimate(true);
    }, 2550);
  };

  const mooveLR = () => {
    Animated.timing(bottomPosition, {
      toValue: 1000,
      duration: 2500, // the duration of the animation
      easing: Easing.linear, // the style of animation
      useNativeDriver: false,
    }).start(); // starts this annimation once this method is called
  };

  useEffect(() => {
    setCompleteAnimate();
    mooveLR();
  }, []);

  useEffect(() => {
    if (endAnimate) {
      if (false) {
        return navigation.navigate('Main');
      }
      return navigation.navigate('Auth');
    }
  }, [endAnimate, navigation]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.blue,
        justifyContent: 'flex-end',
        alignItems: 'center',
      }}>
      <Animated.Image
        style={{
          width: 227,
          height: 300,
          bottom: bottomPosition,
        }}
        source={rocketImage}
      />
    </View>
  );
}

const mapStateToProps = ({ auth: { authCheck, user } }) => ({
  authCheck,
  user,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RocketAnimated);
