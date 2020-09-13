import React, { Component } from 'react';
import { View, SafeAreaView, Platform, StyleSheet, Text } from 'react-native';
import Video from 'react-native-video';
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';

import Header from '~/components/Header';
import { commons } from '~/styles';

import styles from './styles';

class Detail extends Component {
  videoPlayer;

  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      duration: 0,
      isFullScreen: false,
      isLoading: true,
      paused: false,
      playerState: PLAYER_STATES.PLAYING,
      screenType: 'content',
    };
  }

  onSeek = (seek) => {
    //Handler for change in seekbar
    this.videoPlayer.seek(seek);
  };

  onPaused = (playerState) => {
    //Handler for Video Pause
    this.setState({
      paused: !this.state.paused,
      playerState,
    });
  };

  onReplay = () => {
    //Handler for Replay
    this.setState({ playerState: PLAYER_STATES.PLAYING });
    this.videoPlayer.seek(0);
  };

  onProgress = (data) => {
    const { isLoading, playerState } = this.state;
    // Video Player will continue progress even if the video already ended
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({ currentTime: data.currentTime });
    }
  };

  onLoad = (data) =>
    this.setState({ duration: data.duration, isLoading: false });

  onLoadStart = (data) => this.setState({ isLoading: true });

  onEnd = () => this.setState({ playerState: PLAYER_STATES.ENDED });

  onError = (error) => alert('Oh! ', error);

  exitFullScreen = () => {
    alert('Exit full screen');
    // https://player.vimeo.com/video/56282283/config
  };

  enterFullScreen = () => {};

  onFullScreen = () => {
    if (this.state.screenType == 'content') {
      this.setState({ screenType: 'cover' });
    } else {
      this.setState({ screenType: 'content' });
    }
  };
  renderToolbar = () => (
    <View>
      <Text> toolbar </Text>
    </View>
  );
  onSeeking = (currentTime) => this.setState({ currentTime });

  render() {
    return (
      <View style={commons.body}>
        <Header title="Tútulo Vídeo" hasBack />
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Video
              onEnd={this.onEnd}
              onLoad={this.onLoad}
              onLoadStart={this.onLoadStart}
              onProgress={this.onProgress}
              paused={this.state.paused}
              ref={(videoPlayer) => (this.videoPlayer = videoPlayer)}
              resizeMode={this.state.screenType}
              onFullScreen={this.state.isFullScreen}
              poster="https://baconmockup.com/300/200/"
              source={{
                uri:
                  'https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3',
              }}
              style={styles.mediaPlayer}
              volume={10}
            />
            <MediaControls
              duration={this.state.duration}
              isLoading={this.state.isLoading}
              mainColor="#333"
              onFullScreen={this.onFullScreen}
              onPaused={this.onPaused}
              onReplay={this.onReplay}
              onSeek={this.onSeek}
              onSeeking={this.onSeeking}
              playerState={this.state.playerState}
              progress={this.state.currentTime}
              toolbar={this.renderToolbar()}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}

export default Detail;
