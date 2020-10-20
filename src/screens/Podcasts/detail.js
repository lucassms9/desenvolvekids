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
  const [uriComplete, setUriComplete] = useState('');
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PLAYING);
  const [screenType, setScreenType] = useState('content');

  const podcast = route.params.podcast;

  const onSeek = (seek) => {
    //Handler for change in seekbar
    videoPlayer.seek(seek);
  };

  const onPaused = (playerState) => {
    //Handler for Video Pause
    setPlayerState(playerState);
    setPaused(!paused);
  };

  const onReplay = () => {
    //Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    videoPlayer.seek(0);
  };

  const onProgress = (data) => {
    // Video Player will continue progress even if the video already ended
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      setCurrentTime(data.currentTime);
    }
  };

  const onLoad = (data) => {
    setDuration(data.duration);
    setIsLoading(false);
  };

  const onLoadStart = (data) => setIsLoading(true);

  const onEnd = () => setPlayerState(PLAYER_STATES.ENDED);

  const onError = (error) => alert('Oh! ', error);

  const exitFullScreen = () => {
    alert('Exit full screen');
    // https://player.vimeo.com/video/56282283/config
  };

  const enterFullScreen = () => {};

  const onFullScreen = () => {
    if (screenType == 'content') {
      setScreenType('cover');
    } else {
      setScreenType('content');
    }
  };

  const renderToolbar = () => (
    <View>
      <Text> toolbar </Text>
    </View>
  );

  const onSeeking = (currentTime) => this.setState({ currentTime });

  return (
    <View style={commons.body}>
      <Header title={podcast.titulo} hasBack />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Video
            onEnd={onEnd}
            onLoad={onLoad}
            onLoadStart={onLoadStart}
            onProgress={onProgress}
            paused={paused}
            ref={(videoPlayer) => (videoPlayer = videoPlayer)}
            resizeMode={screenType}
            onFullScreen={isFullScreen}
            source={{
              uri: podcast.uri_vmeo,
            }}
            style={styles.mediaPlayer}
            volume={10}
          />
          <MediaControls
            duration={duration}
            isLoading={isLoading}
            mainColor={colors.primary}
            onFullScreen={onFullScreen}
            onPaused={onPaused}
            onReplay={onReplay}
            onSeek={onSeek}
            onSeeking={onSeeking}
            playerState={playerState}
            progress={currentTime}
            toolbar={renderToolbar()}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Detail;
