import React from 'react';
import { Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {enableScreens} from 'react-native-screens';

enableScreens(true);

import { Icon } from 'react-native-elements';

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
import Gallery from '~/screens/Gallery';
import Dependent from '~/screens/Dependent';
import Tips from '~/screens/Tips';
import Store from '~/screens/Store';
import Forum from '~/screens/Forum';

/**
 * Stacks
 */

import Contact from '~/screens/Contact';
import Progress from '~/screens/Progress';
import AvaliationQuestions from '~/screens/Progress/AvaliationQuestions';
import MovieDetail from '~/screens/Movies/detail';
import PodcastDetail from '~/screens/Podcasts/detail';
import TipDetail from '~/screens/Tips/detail';
import ForumCreate from '~/screens/ForumCreate/';

import Cart from '~/screens/Cart';
import DeliveryInfo from '~/screens/DeliveryInfo';
import Product from '~/screens/Product';
import PaymentMethod from '~/screens/PaymentMethod';
import FinishedOrder from '~/screens/FinishedOrder';
import Plans from '~/screens/Plans';
import PlanConfirm from '~/screens/PlanConfirm';
import PlanTerm from '~/screens/PlanTerm';

import Options from '~/screens/Options';
import Profile from '~/screens/Profile';
import MyPlan from '~/screens/MyPlan';
import MyOrders from '~/screens/MyOrders';
import Childrens from '~/screens/Childrens';

import Activities from '~/screens/Activities';
import ActivityDetail from '~/screens/ActivityDetail';
import ActivityComplete from '~/screens/ActivityComplete';

import Extras from '~/screens/Extras';
import ExtraDetail from '~/screens/ExtraDetail';

import Health from '~/screens/Health';
import HealthDetail from '~/screens/HealthDetail';

function Routes() {
  const ActivitiesStack = createStackNavigator();
  function ActivitiesStackScreen() {
    return (
      <ActivitiesStack.Navigator>
        <ActivitiesStack.Screen
          name="Activities"
          component={Activities}
          options={{
            headerShown: false,
          }}
        />
        <ActivitiesStack.Screen
          name="ActivityDetail"
          component={ActivityDetail}
          options={{
            headerShown: false,
          }}
        />
        <ActivitiesStack.Screen
          name="ActivityComplete"
          component={ActivityComplete}
          options={{
            headerShown: false,
          }}
        />
      </ActivitiesStack.Navigator>
    );
  }

  const ExtrasStack = createStackNavigator();
  function ExtrasStackScreen() {
    return (
      <ExtrasStack.Navigator>
        <ExtrasStack.Screen
          name="Extras"
          component={Extras}
          options={{
            headerShown: false,
          }}
        />
        <ActivitiesStack.Screen
          name="ActivityDetail"
          component={ActivityDetail}
          options={{
            headerShown: false,
          }}
        />
      </ExtrasStack.Navigator>
    );
  }

  const HealthStack = createStackNavigator();
  function HealthStackScreen() {
    return (
      <HealthStack.Navigator>
        <HealthStack.Screen
          name="Health"
          component={Health}
          options={{
            headerShown: false,
          }}
        />
        <ActivitiesStack.Screen
          name="ActivityDetail"
          component={ActivityDetail}
          options={{
            headerShown: false,
          }}
        />
      </HealthStack.Navigator>
    );
  }

  const OptionsStack = createStackNavigator();
  function OptionsStackScreen() {
    return (
      <OptionsStack.Navigator>
        <OptionsStack.Screen
          name="Options"
          component={Options}
          options={{
            headerShown: false,
          }}
        />

        <OptionsStack.Screen
          name="DeliveryInfo"
          component={DeliveryInfo}
          options={{
            headerShown: false,
          }}
        />
        <OptionsStack.Screen
          name="MyPlan"
          component={MyPlan}
          options={{
            headerShown: false,
          }}
        />
        <OptionsStack.Screen
          name="MyOrders"
          component={MyOrders}
          options={{
            headerShown: false,
          }}
        />
        <OptionsStack.Screen
          name="Childrens"
          component={Childrens}
          options={{
            headerShown: false,
          }}
        />
        <OptionsStack.Screen
          name="Contact"
          component={Contact}
          options={{
            headerShown: false,
          }}
        />
        <OptionsStack.Screen
          name="Progress"
          component={Progress}
          options={{
            headerShown: false,
          }}
        />
        <OptionsStack.Screen
          name="AvaliationQuestions"
          component={AvaliationQuestions}
          options={{
            headerShown: false,
          }}
        />
      </OptionsStack.Navigator>
    );
  }

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
      </StoreStack.Navigator>
    );
  }

  const ForumStack = createStackNavigator();

  function ForumStackScreen() {
    return (
      <ForumStack.Navigator>
        <TipStack.Screen
          name="Forum"
          component={Forum}
          options={{
            headerShown: false,
          }}
        />
        <ForumStack.Screen
          name="ForumCreate"
          component={ForumCreate}
          options={{
            headerShown: false,
          }}
        />
      </ForumStack.Navigator>
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
        initialRouteName="Activities"
        tabBarOptions={{
          activeTintColor: colors.darkGray,
          inactiveTintColor: '#fff',
          style: {
            backgroundColor: colors.tabBarColor,
            borderTopColor: 'transparent',
          },
        }}>
        <Tab.Screen
          name="Activities"
          component={ActivitiesStackScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Icon
                  // name="check-square"
                  name="edit"
                  type="feather"
                  color={color}
                  size={20}
                />
              );
            },
            tabBarLabel: ({ focused }) => {
              const color = focused ? colors.darkGray : '#fff';
              return (
                <Text style={{ fontSize: 13, color: color }}> Atividades </Text>
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
                <Icon
                  name="lightbulb-on-outline"
                  type="material-community"
                  color={color}
                  size={25}
                />
              );
            },
            tabBarLabel: ({ focused }) => {
              const color = focused ? colors.darkGray : '#fff';
              return (
                <Text style={{ fontSize: 14, color: color }}> Dicas </Text>
              );
            },
          }}
        />

        <Tab.Screen
          name="Health"
          component={HealthStackScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Icon name="heart" type="feather" color={color} size={20} />
              );
            },
            tabBarLabel: ({ focused }) => {
              const color = focused ? colors.darkGray : '#fff';
              return (
                <Text style={{ fontSize: 13, color: color }}> Saúde </Text>
              );
            },
          }}
        />
        <Tab.Screen
          name="Extras"
          component={ExtrasStackScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Icon
                  name="folder-plus"
                  type="feather"
                  color={color}
                  size={20}
                />
              );
            },
            tabBarLabel: ({ focused }) => {
              const color = focused ? colors.darkGray : '#fff';
              return (
                <Text style={{ fontSize: 13, color: color }}> Extras </Text>
              );
            },
          }}
        />

        <Tab.Screen
          name="Forum"
          component={Forum}
          options={{
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <Icon
                  color={color}
                  name="forum-outline"
                  type="material-community"
                  size={20}
                />
              );
            },
            tabBarLabel: ({ focused }) => {
              const color = focused ? colors.darkGray : '#fff';
              return (
                <Text style={{ fontSize: 13, color: color }}>
                  Dúvidas
                </Text>
              );
            },
          }}
        />
      </Tab.Navigator>
    );
  };

  const PlansStack = createStackNavigator();
  function PlansStackScreen() {
    return (
      <PlansStack.Navigator>
        <PlansStack.Screen
          name="Plans"
          component={Plans}
          options={{
            headerShown: false,
          }}
        />
        <PlansStack.Screen
          name="PlanTerm"
          component={PlanTerm}
          options={{
            headerShown: false,
          }}
        />
        <PlansStack.Screen
          name="DeliveryInfo"
          component={DeliveryInfo}
          options={{
            headerShown: false,
          }}
        />
        <PlansStack.Screen
          name="PaymentMethod"
          component={PaymentMethod}
          options={{
            headerShown: false,
          }}
        />
        <PlansStack.Screen
          name="PlanConfirm"
          component={PlanConfirm}
          options={{
            headerShown: false,
          }}
        />
      </PlansStack.Navigator>
    );
  }

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
        <StoreStack.Screen
          name="DeliveryInfo"
          component={DeliveryInfo}
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
        <StoreStack.Screen
          name="FinishedOrder"
          component={FinishedOrder}
          options={{
            headerShown: false,
          }}
        />
        <ContentStack.Screen
          name="Options"
          component={OptionsStackScreen}
          options={{
            headerShown: false,
          }}
        />
        <ContentStack.Screen
          name="MyPlan"
          component={MyPlan}
          options={{
            headerShown: false,
          }}
        />
        <ContentStack.Screen
          name="MyOrders"
          component={MyOrders}
          options={{
            headerShown: false,
          }}
        />
        <ContentStack.Screen
          name="Childrens"
          component={Childrens}
          options={{
            headerShown: false,
          }}
        />
        <ContentStack.Screen
          name="Dependent"
          component={Dependent}
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
          name="Plans"
          component={PlansStackScreen}
          options={{
            headerShown: false,
          }}
        />
        <ContentStack.Screen
          name="Gallery"
          component={Gallery}
          options={{
            headerShown: false,
          }}
        />
        <ContentStack.Screen
          name="Forum"
          component={ForumStackScreen}
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
