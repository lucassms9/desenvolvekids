import React, { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { Card, ListItem, Button, Icon, Image } from 'react-native-elements';

import Header from '~/components/Header';
import { commons } from '~/styles';
function Movies() {
  const [users, setUsers] = useState([
    {
      name: 'brynn',
      avatar:
        'https://img.freepik.com/free-vector/video-media-player-design_114579-839.jpg?size=626&ext=jpg',
    },
    {
      name: 'brynn',
      avatar:
        'https://img.freepik.com/free-vector/video-media-player-design_114579-839.jpg?size=626&ext=jpg',
    },
    {
      name: 'brynn',
      avatar:
        'https://img.freepik.com/free-vector/video-media-player-design_114579-839.jpg?size=626&ext=jpg',
    },
  ]);
  return (
    <View style={commons.body}>
      <Header title="Vídeos" />
      <SafeAreaView>
        <View style={commons.container}>
          {users.map((u, i) => {
            return (
              <Card>
                <Card.Title>CARD VIDEO</Card.Title>
                <Card.Divider />

                <View key={i} style={{}}>
                  <Image
                    style={{ height: 200 }}
                    resizeMode="contain"
                    source={{ uri: u.avatar }}
                  />
                  <Text style={{}}>{u.name}</Text>
                </View>
              </Card>
            );
          })}
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Movies;
