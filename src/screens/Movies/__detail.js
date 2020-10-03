import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Platform, StyleSheet, Text } from 'react-native';
import Video from 'react-native-video';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import Header from '~/components/Header';
import { commons } from '~/styles';

import styles from './styles';

let videoPlayer;

const Detail = ({ route }) => {
  const movie = route.params.movie;
  const getUri = async () => {
    console.log(movie.uri_vmeo);
    const { data } = await axios.get(
      `https://player.vimeo.com/video/${movie.uri_vmeo}/config`,
    );
  };

  //   <iframe src="https://player.vimeo.com/video/463674490" width="640" height="564" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>

  return (
    <View style={commons.body}>
      <Header title="Tútulo Vídeo" hasBack />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <WebView
            source={{
              uri: 'https://player.vimeo.com/video/463674490',
              headers: { Referer: 'https://app.agrega.tech/' },
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Detail;
