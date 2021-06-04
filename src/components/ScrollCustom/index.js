import React, { useRef, useState } from 'react';
import { View, Animated, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

const ScrollCustom = ({ children, indicatorColor, scrollBarColor, style }) => {
  const [completeScrollBarHeight, setCompleteScrollBarHeight] = useState(1);
  const [visibleScrollBarHeight, setVisibleScrollBarHeight] = useState(0);
  const scrollIndicator = useRef(new Animated.Value(0)).current;

  const scrollIndicatorSize =
    completeScrollBarHeight > visibleScrollBarHeight
      ? (visibleScrollBarHeight * visibleScrollBarHeight)
      / completeScrollBarHeight
      : visibleScrollBarHeight;

  const difference =
    visibleScrollBarHeight > scrollIndicatorSize
      ? visibleScrollBarHeight - scrollIndicatorSize
      : 1;

  const scrollIndicatorPosition = Animated.multiply(
    scrollIndicator,
    visibleScrollBarHeight / completeScrollBarHeight,
  ).interpolate({
    extrapolate: 'clamp',
    inputRange: [0, difference],
    outputRange: [0, difference],
  });

  const onContentSizeChange = (_, contentHeight) =>
    setCompleteScrollBarHeight(contentHeight);

  const onLayout = ({
    nativeEvent: {
      layout: { height },
    },
  }) => {
    setVisibleScrollBarHeight(height);
  };

  return (
    <View style={{ flexDirection: 'row', paddingRight: 1, width: '100%', ...style }}>
      <ScrollView
        style={{ width: '100%' }}
        contentContainerStyle={{ paddingRight: 10, paddingBottom: 90 }}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={onContentSizeChange}
        onLayout={onLayout}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollIndicator } } }],
          { useNativeDriver: false }
        )}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollIndicator } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginTop: 40 }}>
          {children}
        </View>
      </ScrollView>
      <View style={{
        backgroundColor: scrollBarColor,
        borderRadius: 3,
        width: 6,
      }}>
        <Animated.View
          style={{
            width: 6,
            borderRadius: 8,
            backgroundColor: indicatorColor,
            height: scrollIndicatorSize,
            transform: [{ translateY: scrollIndicatorPosition }]
          }}
        />

      </View>
    </View>
  )
}

ScrollCustom.propTypes = {
  indicatorColor: PropTypes.string,
  scrollBarColor: PropTypes.string,
};

ScrollCustom.defaultProps = {
  indicatorColor: '#FD9A00',
  scrollBarColor: '#ccc',
};

export default ScrollCustom;