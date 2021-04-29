import React, { useState, useRef, useMemo, useEffect } from 'react';

import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Modal, ModalContent } from 'react-native-modals';
import { Image, Button, Icon } from 'react-native-elements';
import Header from '~/components/Header';

import { colors, commons } from '~/styles';


function Contact() {
  useEffect(() => {
   
  }, []);

  return (
    <View style={commons.body}>
      <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
        <Header title="Fale Conosco" hasBack />
        <View style={[commons.container, { flex: 1 }]}>
          <View style={{ margin: 15, backgroundColor:'#eee', height:150, borderRadius:10, }}>
            <View style={{marginTop:15}}>
              <Text style={{textAlign:'center', fontSize:16, fontWeight:'bold'}}>Entre em contato com nosso time.</Text>
            </View>
            <View style={{flexDirection:'row', marginTop:15, }}>
              <Icon style={{marginHorizontal:10}} color="#000" name="phone" type="feather" />
              <Text style={{marginTop:3}}>(99) 99999-9999</Text>
            </View>

            <View style={{flexDirection:'row', marginTop:15}}>
              <Icon style={{marginHorizontal:10}} color="#000" name="mail" type="feather" />
              <Text style={{marginTop:2}}>contato@desenvolvekids.com.br</Text>
            </View>

          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Contact;
