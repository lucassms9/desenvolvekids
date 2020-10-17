import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useIsFocused } from '@react-navigation/native';
import { Creators as AuthActions } from '~/store/ducks/auth';

import { SafeAreaView, ScrollView, View, Text } from 'react-native';

import {
  Card,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';

import Header from '~/components/Header';
import { commons } from '~/styles';
import Loader from '~/components/Loader';
import Pagination from '~/components/Pagination';

import api from '~/services/api';

function Movies({ setNavigation, navigation }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const moreMovies = async () => {
    if (page < totalPage) {
      setPage(page + 1);
    }

    const res = await getMoviesSync(page + 1);
    const allMovies = [...movies, ...res.videos];

    setMovies(allMovies);
  };

  const getMovies = async () => {
    setLoading(true);
    try {
      const res = await getMoviesSync();

      setMovies(res.videos);
      setTotalPage(res.total_pages);
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };

  const getMoviesSync = async (pageGet = 1) => {
    const res = await api.post('/multimidias', {
      multimidias_tipos: 1,
      page: pageGet,
    });

    return res;
  };

  useEffect(() => {
    setNavigation(navigation);
    getMovies();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('focado na screen videos');
      setPage(1);
      getMovies();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={commons.body}>
      <Header title="Vídeos" />
      <SafeAreaView>
        <View style={[commons.container, { paddingBottom: 70 }]}>
          {loading && <Loader />}
          {!loading && (
            <ScrollView>
              {movies.map((movie, index) => {
                return (
                  <View
                    style={{
                      backgroundColor: '#fff',
                      height: 250,
                      marginBottom: 15,
                    }}>
                    <Card>
                      <CardImage
                        source={{ uri: movie.thumb }}
                        title={movie.titulo}
                      />
                      <CardContent
                        style={{ flex: 0 }}
                        text={movie.descricao_resumida}
                      />
                      <CardAction separator={true} inColumn={false}>
                        <CardButton
                          onPress={() => {
                            navigation.navigate('MovieDetail', {
                              movie: movie,
                            });
                          }}
                          title="ASSISTIR"
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
                getMoreItem={moreMovies}
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

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
