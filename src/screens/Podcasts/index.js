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

import Loader from '~/components/Loader';
import Header from '~/components/Header';
import Pagination from '~/components/Pagination';

import { commons } from '~/styles';

import api from '~/services/api';

function Podcasts({ navigation }) {
  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const morePodcasts = async () => {
    if (page < totalPage) {
      setPage(page + 1);
    }

    const res = await getPodcastsSync(page + 1);
    const allMovies = [...podcasts, ...res.podcasts];

    setPodcasts(allMovies);
  };

  const getPodcasts = async () => {
    setLoading(true);
    try {
      const res = await getPodcastsSync();
      setPodcasts(res.podcasts);
      setTotalPage(res.total_pages);
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };

  const getPodcastsSync = async (pageGet = 1) => {
    const res = await api.post('/multimidias', {
      multimidias_tipos: 2,
      page: pageGet,
    });
    return res;
  };

  useEffect(() => {
    getPodcasts();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('focado na screen podcast');
      getPodcasts();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={commons.body}>
      <Header title="Podcasts" />
      <SafeAreaView>
        <View style={[commons.container, { paddingBottom: 70 }]}>
          {loading && <Loader />}
          {!loading && (
            <ScrollView>
              {podcasts.map((podcast, i) => {
                return (
                  <View
                    style={{
                      backgroundColor: '#fff',
                      height: 250,
                      marginBottom: 15,
                    }}>
                    <Card>
                      <CardImage
                        source={{ uri: podcast.thumb }}
                        title={podcast.titulo}
                      />
                      <CardContent
                        style={{ flex: 0 }}
                        text={podcast.descricao_resumida}
                      />
                      <CardAction separator={true} inColumn={false}>
                        <CardButton
                          onPress={() => {
                            navigation.navigate('PodcastDetail', {
                              podcast: podcast,
                            });
                          }}
                          title="OUVIR"
                          color="blue"
                        />
                      </CardAction>
                    </Card>
                  </View>
                );
              })}
              <Pagination
                totalPage={totalPage}
                page={page}
                getMoreItem={morePodcasts}
              />
            </ScrollView>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Podcasts);
