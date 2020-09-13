import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, Animated, Easing } from 'react-native';
import { useNavigation, StackActions } from '@react-navigation/native';

import { colors } from '~/styles';
import rocketImage from '~/assets/images/rocket.png';

function RocketAnimated({ authCheck }) {
  const [endAnimate, setEndAnimate] = useState(false);
  const [bottomPosition, setBottomPosition] = useState(
    new Animated.Value(-100),
  );

  const navigation = useNavigation();

  const mooveLR = () => {
    Animated.timing(bottomPosition, {
      toValue: 1000,
      duration: 3000, // the duration of the animation
      easing: Easing.linear, // the style of animation
      useNativeDriver: false,
    }).start(); // starts this annimation once this method is called

    setTimeout(() => {
      setEndAnimate(true);
    }, 2900);
  };

  useEffect(() => {
    mooveLR();
  }, []);

  useEffect(() => {
    if (endAnimate) {
      if (authCheck) {
        return navigation.dispatch(StackActions.replace('Main'));
      }
      return navigation.dispatch(StackActions.replace('Auth'));
    }
  }, [endAnimate, navigation, authCheck]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.backgroung,
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

const mapStateToProps = ({ auth: { authCheck } }) => ({
  authCheck,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RocketAnimated);
