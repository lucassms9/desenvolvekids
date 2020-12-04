import React, { useState, useRef } from 'react';

import { View, Text } from 'react-native';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';

import { colors } from '~/styles';

import styles from './styles';

function PlayerCustom({ uriVideo }) {
  let refVideoPlayer;
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(true);
  const [playerState, setPlayerState] = useState(PLAYER_STATES.PAUSED);
  const [screenType, setScreenType] = useState('contain');

  const onSeek = (seek) => {
    //Handler for change in seekbar
    refVideoPlayer.seek(seek);
  };

  const onPaused = (playerState) => {
    //Handler for Video Pause
    setPlayerState(playerState);
    setPaused(!paused);
  };

  const onReplay = () => {
    //Handler for Replay
    setPlayerState(PLAYER_STATES.PLAYING);
    refVideoPlayer.seek(0);
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
      <Text> DevKids </Text>
    </View>
  );

  const onSeeking = (currentTime) => setCurrentTime(currentTime);

  return (
    <View style={{ height: 380 }}>
      <Video
        onEnd={onEnd}
        onLoad={onLoad}
        onLoadStart={onLoadStart}
        onProgress={onProgress}
        paused={paused}
        ref={(ref) => {
          refVideoPlayer = ref;
        }}
        resizeMode={screenType}
        onFullScreen={isFullScreen}
        source={{
          uri: uriVideo,
        }}
        style={styles.mediaPlayer}
        volume={5}
      />
      <MediaControls
        fadeOutDelay={1000}
        duration={duration}
        isLoading={isLoading}
        mainColor={colors.primary}
        // onFullScreen={onFullScreen}
        onPaused={onPaused}
        onReplay={onReplay}
        onSeek={onSeek}
        onSeeking={onSeeking}
        playerState={playerState}
        progress={currentTime}
        toolbar={renderToolbar()}
      />
    </View>
  );
}

export default PlayerCustom;
