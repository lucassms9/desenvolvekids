import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
Ionicons.loadFont();

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
  const Tab = createBottomTabNavigator();
  const MainTabBottom = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Movies') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Movies" component={Movies} />
        <Tab.Screen name="Podcasts" component={Podcasts} />
        <Tab.Screen name="Tips" component={Tips} />
        <Tab.Screen name="Store" component={Store} />
      </Tab.Navigator>
    );
  };

  const AuthStack = createStackNavigator();
  function AuthStackScreen() {
    return (
      <AuthStack.Navigator>
        <AuthStack.Screen name="SignIn" component={SignIn} />
      </AuthStack.Navigator>
    );
  }

  const ContentStack = createStackNavigator();
  return (
    <NavigationContainer>
      <ContentStack.Navigator initialRouteName={'Rocket'}>
        <ContentStack.Screen name="Rocket" component={RocketAnimated} />
        <ContentStack.Screen name="Auth" component={AuthStackScreen} />
        <ContentStack.Screen name="Main" component={MainTabBottom} />
      </ContentStack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
