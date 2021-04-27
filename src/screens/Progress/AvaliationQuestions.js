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

function AvaliationQuestions() {

  useEffect(() => {}, []);


  return (
    <View style={commons.body}>
      <Header title="Progresso" hasBack />
      <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
        <View style={[commons.container, { flex: 1 }]}>
         
         <View style={{marginHorizontal:20}}>
           <View style={{marginBottom:20}}>
           <Text style={{color:'#fff'}}>
              Pergnta ? Pergnta ?Pergnta ? Pergnta ? Pergnta ? Pergnta ?
            </Text>
           </View>
            <ButtonPrimary text='Completo'/>
         </View>

        </View>
      </SafeAreaView>
    </View>
  );
}

export default AvaliationQuestions;
