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

function Routes() {
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
            tabBarLabel: (props) => {
              console.log(props);
              return <Text style={{ fontSize: 14 }}> Vídeos </Text>;
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
            tabBarLabel: (props) => {
              console.log(props);
              return <Text style={{ fontSize: 14 }}> Podcasts </Text>;
            },
          }}
        />
        <Tab.Screen
          name="Tips"
          component={Tips}
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
            tabBarLabel: (props) => {
              console.log(props);
              return <Text style={{ fontSize: 14 }}> Dicas </Text>;
            },
          }}
        />
        <Tab.Screen
          name="Store"
          component={Store}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              return <MaterialIcons name="shop" size={25} color={color} />;
            },
            tabBarLabel: (props) => {
              console.log(props);
              return <Text style={{ fontSize: 14 }}> Loja </Text>;
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
      </AuthStack.Navigator>
    );
  }

  const ContentStack = createStackNavigator();
  return (
    <NavigationContainer>
      <ContentStack.Navigator initialRouteName={'Rocket'}>
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
