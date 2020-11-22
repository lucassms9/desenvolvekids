import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Platform, StyleSheet, Text } from 'react-native';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
import axios from 'axios';
import Header from '~/components/Header';
import { commons, colors } from '~/styles';

import styles from './styles';

let videoPlayer;

const Detail = ({ route }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('content');

  const podcast = route.params.podcast;

  return (
    <View style={commons.body}>
      <Header title={podcast.titulo} hasBack />
      <SafeAreaView style={{ flex: 1 }} />
    </View>
  );
};

export default Detail;
