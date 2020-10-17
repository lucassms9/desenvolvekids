import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useIsFocused } from '@react-navigation/native';
import { Creators as AuthActions } from '~/store/ducks/auth';

import {
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
} from 'react-native';

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
import ItemsFilter from '~/components/ItemsFilter';
import Pagination from '~/components/Pagination';
import NotFound from '~/components/NotFound';

import api from '~/services/api';

function Movies({ setNavigation, navigation }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasFilter, setHasFilter] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [categories, setCategories] = useState([]);

  const filterMovies = async (id) => {
    getMovies(id);
  };

  const moreMovies = async () => {
    if (page < totalPage) {
      setPage(page + 1);
    }

    const res = await getMoviesSync(page + 1);
    const allMovies = [...movies, ...res.videos];

    setMovies(allMovies);
  };

  const getMovies = async (filter = '') => {
    setLoading(true);
    try {
      const res = await getMoviesSync(1, filter);

      setMovies(res.videos);
      setTotalPage(res.total_pages);
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };

  const getMoviesSync = async (pageGet = 1, filter = '') => {
    if (filter) {
      setHasFilter(true);
    }
    const res = await api.post('/multimidias', {
      multimidias_tipos: 1,
      page: pageGet,
      categoria: filter,
    });

    return res;
  };

  const getCategories = async () => {
    const res = await api.post('multimidias/categorias-list');
    const handle = res.categorias.map((cat) => ({
      label: cat.nome,
      id: cat.id,
    }));

    setCategories(handle);
  };

  const resetFilter = () => {
    getMovies();
    setHasFilter(false);
  };

  useEffect(() => {
    setNavigation(navigation);
    getCategories();
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
              {hasFilter && (
                <TouchableOpacity onPress={resetFilter}>
                  <View style={{ alignItems: 'center', marginBottom: 10 }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 17,
                        fontWeight: '700',
                      }}>
                      Remover Filtro
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                <ItemsFilter filterFunc={filterMovies} items={categories} />
              </View>
              {movies.length === 0 && <NotFound type="vídeo" />}
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
