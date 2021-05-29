import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import SliderEntry from '~/components/SliderEntry';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { itemWidth, sliderWidth } from './styles';

import styles from './styles';
import {colors} from '~/styles';

function MainCarousel({ imagens }) {
  const [sliderActiveSlide, setSliderActiveSlide] = useState(1);
  const [sliderRef, setSliderRef] = useState(null);

  const renderItemWithParallax = ({ item, index }, parallaxProps) => {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={false}
        parallaxProps={parallaxProps}
      />
    );
  };

  useEffect(() => {
    setTimeout(() => {
      setSliderActiveSlide(0);
    }, 300);
  }, []);

  return (
    <View>
      <Carousel
        ref={(c) => setSliderRef(c)}
        data={imagens}
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
        dotsLength={imagens.length}
        activeDotIndex={sliderActiveSlide}
        containerStyle={styles.paginationContainer}
        dotColor={colors.secondary}
        dotStyle={styles.paginationDot}
        inactiveDotColor={'#000'}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        carouselRef={sliderRef}
        tappableDots={!!sliderRef}
      />
    </View>
  );
}

export default MainCarousel;
