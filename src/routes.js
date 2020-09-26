import React from 'react';
import { Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

MaterialIcons.loadFont();
FontAwesome.loadFont();
MaterialCommunityIcons.loadFont();

import colors from '~/styles/colors';
/**
 * Public
 */
import RocketAnimated from '~/components/RocketAnimated';
import SignIn from '~/screens/SignIn';
import SignUp from '~/screens/SignUp';
import Recover from '~/screens/Recover';

/**
 * Tabs
 */

import Movies from '~/screens/Movies';
import Podcasts from '~/screens/Podcasts';
import Tips from '~/screens/Tips';
import Store from '~/screens/Store';

/**
 * Stacks
 */
import Profile from '~/screens/Profile';
import MovieDetail from '~/screens/Movies/detail';
import PodcastDetail from '~/screens/Podcasts/detail';
import TipDetail from '~/screens/Tips/detail';

import Cart from '~/screens/Cart';
import DeliveryInfo from '~/screens/DeliveryInfo';
import Product from '~/screens/Product';
import PaymentMethod from '~/screens/PaymentMethod';
import FinishedOrder from '~/screens/FinishedOrder';

function Routes() {
  const StoreStack = createStackNavigator();

  function StoreStackScreen() {
    return (
      <StoreStack.Navigator>
        <StoreStack.Screen
          name="Store"
          component={Store}
          options={{
            headerShown: false,
          }}
        />
        <StoreStack.Screen
          name="Cart"
          component={Cart}
          options={{
            headerShown: false,
          }}
        />
        <StoreStack.Screen
          name="Product"
          component={Product}
          options={{
            headerShown: false,
          }}
        />
        <StoreStack.Screen
          name="DeliveryInfo"
          component={DeliveryInfo}
          options={{
            headerShown: false,
          }}
        />
        <StoreStack.Screen
          name="FinishedOrder"
          component={FinishedOrder}
          options={{
            headerShown: false,
          }}
        />
        <StoreStack.Screen
          name="PaymentMethod"
          component={PaymentMethod}
          options={{
            headerShown: false,
          }}
        />
      </StoreStack.Navigator>
    );
  }

  const TipStack = createStackNavigator();

  function TipStackScreen() {
    return (
      <TipStack.Navigator>
        <TipStack.Screen
          name="Tips"
          component={Tips}
          options={{
            headerShown: false,
          }}
        />
        <TipStack.Screen
          name="TipDetail"
          component={TipDetail}
          options={{
            headerShown: false,
          }}
        />
      </TipStack.Navigator>
    );
  }
  const MovieStack = createStackNavigator();

  function MovieStackScreen() {
    return (
      <MovieStack.Navigator>
        <MovieStack.Screen
          name="Movies"
          component={Movies}
          options={{
            headerShown: false,
          }}
        />
      </MovieStack.Navigator>
    );
  }

  const Tab = createBottomTabNavigator();
  const MainTabBottom = () => {
    return (
      <Tab.Navigator
        initialRouteName="Movies"
        tabBarOptions={{
          activeTintColor: colors.primary,
          inactiveTintColor: 'gray',
          style: {
            backgroundColor: colors.tabBarColor,
            borderTopColor: 'transparent',
          },
        }}>
        <Tab.Screen
          name="Movies"
          component={MovieStackScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <MaterialIcons name="ondemand-video" size={25} color={color} />
              );
            },
            tabBarLabel: ({ focused }) => {
              const color = focused ? colors.primary : '#000';
              return (
                <Text style={{ fontSize: 14, color: color }}> Vídeos </Text>
              );
            },
          }}
        />
        <Tab.Screen
          name="Podcasts"
          component={Podcasts}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              return <FontAwesome name="podcast" size={25} color={color} />;
            },
            tabBarLabel: ({ focused }) => {
              const color = focused ? colors.primary : '#000';
              return (
                <Text style={{ fontSize: 14, color: color }}> Podcasts </Text>
              );
            },
          }}
        />
        <Tab.Screen
          name="Tips"
          component={TipStackScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <MaterialCommunityIcons
                  name="lightbulb-on-outline"
                  size={25}
                  color={color}
                />
              );
            },
            tabBarLabel: ({ focused }) => {
              const color = focused ? colors.primary : '#000';
              return (
                <Text style={{ fontSize: 14, color: color }}> Dicas </Text>
              );
            },
          }}
        />
        <Tab.Screen
          name="Store"
          component={StoreStackScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              return <MaterialIcons name="shop" size={25} color={color} />;
            },
            tabBarLabel: ({ focused }) => {
              const color = focused ? colors.primary : '#000';
              return <Text style={{ fontSize: 14, color: color }}> Loja </Text>;
            },
          }}
        />
      </Tab.Navigator>
    );
  };

  const AuthStack = createStackNavigator();
  function AuthStackScreen() {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            headerShown: false,
          }}
        />
        <AuthStack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            headerShown: false,
          }}
        />
        <AuthStack.Screen
          name="Recover"
          component={Recover}
          options={{
            headerShown: false,
          }}
        />
      </AuthStack.Navigator>
    );
  }

  const ContentStack = createStackNavigator();
  return (
    <NavigationContainer>
      <ContentStack.Navigator initialRouteName={'Rocket'}>
        <MovieStack.Screen
          name="PodcastDetail"
          component={PodcastDetail}
          options={{
            headerShown: false,
          }}
        />
        <MovieStack.Screen
          name="MovieDetail"
          component={MovieDetail}
          options={{
            headerShown: false,
          }}
        />
        <ContentStack.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
          }}
        />
        <ContentStack.Screen
          name="Rocket"
          component={RocketAnimated}
          options={{
            headerShown: false,
          }}
        />
        <ContentStack.Screen
          name="Auth"
          component={AuthStackScreen}
          options={{
            headerShown: false,
          }}
        />
        <ContentStack.Screen
          name="Main"
          component={MainTabBottom}
          options={{
            headerShown: false,
          }}
        />
      </ContentStack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
