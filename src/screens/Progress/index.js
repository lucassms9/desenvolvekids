import React, { useState, useRef, useMemo, useEffect } from 'react';

import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Modal, ModalContent } from 'react-native-modals';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RNPickerSelect from 'react-native-picker-select';
import { PricingCard,Input,Tab } from 'react-native-elements';
import Header from '~/components/Header';
import NotFound from '~/components/NotFound';
import moment from 'moment';
import api from '~/services/api';
import { maskMoney } from '~/helpers';
import { colors, commons } from '~/styles';
import ButtonPrimary from '~/components/ButtonPrimary';
import { ToastActionsCreators } from 'react-native-redux-toast';

function Progress() {
  const [progress, setProgress] = useState([
    {
      category:'Aréa Fisica',
      percent: 80
    }
  ]);

  useEffect(() => {
 
  },[])

  return (
    <View style={commons.body}>
      <Header title="Progresso" hasBack />
      <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
        <View style={[commons.container, { flex: 1 }]}>
          <View style={{ padding: 15 }}>
          <Tab>
            <Tab.Item title="Recent" />
            <Tab.Item title="favourite" />
            <Tab.Item title="cart" />
          </Tab>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}


export default Progress;