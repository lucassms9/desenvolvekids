import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { View, Animated, Easing } from 'react-native';
import { bindActionCreators } from 'redux';
import { useNavigation, StackActions } from '@react-navigation/native';
import { Creators as AuthActions } from '~/store/ducks/auth';

import { colors } from '~/styles';
import rocketImage from '~/assets/images/rocket.png';

function RocketAnimated(props) {
  const {
    auth: { authCheck, user },
    navigation,
    setNavigation,
    route,
  } = props;
  const [endAnimate, setEndAnimate] = useState(false);
  const [bottomPosition, setBottomPosition] = useState(
    new Animated.Value(-100),
  );

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
    console.log(navigation);
    setNavigation({ ...navigation, ...route });
    mooveLR();
  }, []);

  useEffect(() => {
    if (endAnimate) {
      console.log(authCheck);
      if (authCheck) {
        console.log(user);
        if (user && user.plano && user.plano.length === 0) {
          return navigation.dispatch(StackActions.replace('Plans'));
        }
        return navigation.dispatch(StackActions.replace('Main'));
      }
      return navigation.dispatch(StackActions.replace('Auth'));
    }
  }, [endAnimate, navigation, authCheck, user]);

  return ( 
    <View
      style={{
        flex: 1,
        backgroundColor: '#003048',
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

const mapStateToProps = ({ auth }) => ({
  auth,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...AuthActions,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(RocketAnimated);
