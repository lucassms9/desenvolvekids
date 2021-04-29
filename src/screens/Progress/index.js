import React, { useState, useRef, useMemo, useEffect } from 'react';

import { View, Text, SafeAreaView, useWindowDimensions } from 'react-native';

import { PricingCard, Input, Tab, Tabs } from 'react-native-elements';
import Header from '~/components/Header';
import NotFound from '~/components/NotFound';
import moment from 'moment';
import api from '~/services/api';
import { maskMoney } from '~/helpers';
import { colors, commons } from '~/styles';
import ButtonPrimary from '~/components/ButtonPrimary';
import { ToastActionsCreators } from 'react-native-redux-toast';

import { TabView, SceneMap } from 'react-native-tab-view';

import AvaliationScreen from './AvaliationScreen';
import ProgressScreen from './ProgressScreen';

function Progress() {

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 0, title: 'Avaliação' },
    { key: 1, title: 'Progresso' },
  ]);

  useEffect(() => {}, []);

  const renderScene = SceneMap({
    0: AvaliationScreen,
    1: ProgressScreen,
  });

  return (
    <View style={commons.body}>
      <Header title="Progresso" hasBack />
      <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
        <View style={[commons.container, { flex: 1 }]}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Progress;
