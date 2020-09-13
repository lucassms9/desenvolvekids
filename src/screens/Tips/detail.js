import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useIsFocused } from '@react-navigation/native';
import { Creators as AuthActions } from '~/store/ducks/auth';

import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import { Image, Button } from 'react-native-elements';
import {
  Card,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';

import Header from '~/components/Header';
import { commons } from '~/styles';

function Detail({}) {
  return (
    <View style={commons.body}>
      <Header title="Dica Título" hasBack />
      <SafeAreaView>
        <View style={[commons.container, { paddingBottom: 70 }]}>
          <ScrollView>
            <View
              style={{
                backgroundColor: '#fff',
                height: 250,
                marginBottom: 15,
              }}>
              <Card>
                <CardImage
                  source={{ uri: 'http://placehold.it/480x270' }}
                  title="Above all i am here"
                />
                <CardContent text="Your device will reboot in few seconds once successful, be patient meanwhile" />
                <CardAction separator={true} inColumn={false}>
                  <CardButton
                    onPress={() => {
                      navigation.navigate('MovieDetail');
                    }}
                    title="ASSISTIR"
                    color="blue"
                  />
                </CardAction>
              </Card>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Detail;
