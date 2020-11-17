import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useIsFocused } from '@react-navigation/native';
import { Creators as AuthActions } from '~/store/ducks/auth';

import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import SliderEntry from '~/components/SliderEntry';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import Header from '~/components/Header';
import ButtonPrimary from '~/components/ButtonPrimary';
import { commons, colors } from '~/styles';
import { itemWidth, sliderWidth } from './styles';

import styles from './styles';

function ActivityComplete({ navigation, route }) {
  const [status, setStatus] = useState('');

  const activityComplete = () => {
    navigation.navigate('ActivityComplete');
  };

  useEffect(() => {}, []);

  return (
    <View style={commons.body}>
      <Header title="Dicas" hasBack />
      <SafeAreaView>
        <View style={[commons.container, { paddingBottom: 100 }]}>
          <View>
            <Text>Parabens atividade concluida com sucesso</Text>
          </View>
          <View>
            <ButtonPrimary text="Enviar Comprovacao" onPress={() => {}} />
          </View>

          <View>
            <Text>questionario</Text>
          </View>

          <View>
            <Text>dificuldade</Text>
          </View>

          <View style={{ marginTop: 10 }}>
            <ButtonPrimary text="Enviar Dados" onPress={() => {}} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default ActivityComplete;
