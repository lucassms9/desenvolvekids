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

function ActivityDetail({ navigation, route }) {
  const { tip } = route.params;

  const [status, setStatus] = useState('');
  const [sliderRef, setSliderRef] = useState(null);
  const [sliderActiveSlide, setSliderActiveSlide] = useState(1);

  const activityComplete = () => {
    navigation.navigate('ActivityComplete');
  };

  useEffect(() => {
    setTimeout(() => {
      setSliderActiveSlide(0);
    }, 300);
  }, []);

  const renderItemWithParallax = ({ item, index }, parallaxProps) => {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  };

  return (
    <View style={commons.body}>
      <Header title="Dicas" hasBack />
      <SafeAreaView>
        <View style={[commons.container, { paddingBottom: 100 }]}>
          <ScrollView>
            <Carousel
              ref={(c) => setSliderRef(c)}
              data={tip.imagens}
              renderItem={renderItemWithParallax}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              hasParallaxImages={true}
              firstItem={sliderActiveSlide}
              inactiveSlideScale={0.94}
              inactiveSlideOpacity={0.7}
              inactiveSlideShift={20}
              containerCustomStyle={styles.slider}
              contentContainerCustomStyle={styles.sliderContentContainer}
              enableMomentum={true}
              // autoplay={true}
              onSnapToItem={(index) => setSliderActiveSlide(index)}
            />
            <Pagination
              dotsLength={tip.imagens.length}
              activeDotIndex={sliderActiveSlide}
              containerStyle={styles.paginationContainer}
              dotColor={'rgba(255, 255, 255, 0.92)'}
              dotStyle={styles.paginationDot}
              inactiveDotColor={colors.white}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              carouselRef={sliderRef}
              tappableDots={!!sliderRef}
            />
            <View style={{ marginHorizontal: 8 }}>
              <Text
                style={{
                  color: '#fff',
                  textAlign: 'left',
                  fontSize: 18,
                  fontWeight: '700',
                  marginBottom: 10,
                }}>
                {tip.titulo}
              </Text>
              <Text style={{ color: '#fff', textAlign: 'justify' }}>
                {tip.descricao_completa}
              </Text>

              <View style={{ marginTop: 10 }}>
                <ButtonPrimary
                  text="Marcar como finalizado"
                  onPress={activityComplete}
                />
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default ActivityDetail;
