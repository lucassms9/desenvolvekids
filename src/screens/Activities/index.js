import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
} from 'react-native';

import { Creators as AuthActions } from '~/store/ducks/auth';

import Header from '~/components/Header';
import { commons } from '~/styles';
import Loader from '~/components/Loader';
import ItemsFilter from '~/components/ItemsFilter';
import Pagination from '~/components/Pagination';
import NotFound from '~/components/NotFound';

import {
  Card,
  CardContent,
  CardAction,
  CardButton,
  CardImage,
} from 'react-native-material-cards';

import api from '~/services/api';

function Activities({ setNavigation, navigation, route }) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasFilter, setHasFilter] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [categories, setCategories] = useState([]);

  const filterActivities = async (id) => {
    getActivities(id);
  };

  const moreActivities = async () => {
    if (page < totalPage) {
      setPage(page + 1);
    }

    const res = await getActivitiesSync(page + 1);
    const allActivities = [...activities, ...res.videos];

    setActivities(allActivities);
  };

  const getActivities = async (filter = '') => {
    setLoading(true);
    try {
      const res = await getActivitiesSync(1, filter);

      setActivities(res.dicas);
      setTotalPage(res.total_pages);
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };

  const getActivitiesSync = async (pageGet = 1, filter = '') => {
    if (filter) {
      setHasFilter(true);
    }
    const res = await api.post('dicas/list', { page: pageGet, busca: filter });
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
    getActivities();
    setHasFilter(false);
  };

  useEffect(() => {
    setNavigation({ ...navigation, ...route });
    getCategories();
    getActivities();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('focado na screen videos');
      setPage(1);
      getActivities();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={commons.body}>
      <Header title="Atividades" />
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
                <ItemsFilter filterFunc={filterActivities} items={categories} />
              </View>
              {activities.length === 0 && <NotFound type="Atividades" />}
              {activities.map((tip, index) => {
                return (
                  <View
                    key={tip.id}
                    style={{
                      backgroundColor: '#fff',
                      height: 380,
                      marginBottom: 15,
                    }}>
                    <Card>
                      <CardImage
                        source={{ uri: tip.imagens[0] }}
                        // title={`${tip.titulo.substring(0, 100)} ...`}
                      />
                      <CardContent
                        style={{ flex: 0 }}
                        text={
                          <>
                            <Text
                              style={{
                                fontSize: 18,
                                fontWeight: '700',
                              }}>
                              {tip.titulo} {'\n\n'}
                            </Text>
                            <Text
                              style={{}}>{`${tip.descricao_resumida.substring(
                              0,
                              150,
                            )} ...`}</Text>
                          </>
                        }
                      />
                      <CardAction separator={true} inColumn={false}>
                        <CardButton
                          onPress={() => {
                            navigation.navigate('ActivityDetail', { tip });
                          }}
                          title="LER MAIS"
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
                getMoreItem={moreActivities}
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

export default connect(mapStateToProps, mapDispatchToProps)(Activities);
