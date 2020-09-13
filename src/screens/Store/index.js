import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from '~/store/ducks/auth';

import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import { Image, Button } from 'react-native-elements';
import {
  Card,
  CardTitle,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';

import Header from '~/components/Header';
import { commons } from '~/styles';

function Store({ navigation }) {
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
    {
      name: 'brynn',
      avatar:
        'https://img.freepik.com/free-vector/video-media-player-design_114579-839.jpg?size=626&ext=jpg',
    },
  ]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('focado na screen store');
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={commons.body}>
      <Header title="Loja" />
      <SafeAreaView>
        <View style={[commons.container, { paddingBottom: 70 }]}>
          <ScrollView>
            {users.map((u, i) => {
              return (
                <View
                  style={{
                    backgroundColor: '#fff',
                    height: 250,
                    marginBottom: 15,
                  }}>
                  <Card>
                    <CardImage
                      source={{ uri: 'http://placehold.it/480x270' }}
                      title="Above all i am here"
                    />
                    <CardContent
                      style={{ flex: 0 }}
                      text="Your device will reboot in few seconds once successful, be patient meanwhile"
                    />
                    <CardAction separator={true} inColumn={false}>
                      <CardButton
                        onPress={() => {}}
                        title="ASSISTIR"
                        color="blue"
                      />
                    </CardAction>
                  </Card>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

const mapStateToProps = ({ auth: { user, status } }) => ({
  userEntity: user,
  status,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...AuthActions,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Store);
