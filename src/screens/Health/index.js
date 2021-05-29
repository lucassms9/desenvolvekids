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

import moment from 'moment';

import MainCard from '~/components/MainCard';
import ScrollCustom from '~/components/ScrollCustom';

import { Creators as AuthActions } from '~/store/ducks/auth';

import Header from '~/components/Header';
import { commons } from '~/styles';
import Loader from '~/components/Loader';
import ItemsFilter from '~/components/ItemsFilter';
import Pagination from '~/components/Pagination';
import NotFound from '~/components/NotFound';

import api from '~/services/api';

function Health({ setNavigation, navigation, route }) {
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

    const allActivities = [...activities, ...res.postagens];

    setActivities(allActivities);
  };

  const getActivities = async (filter = '') => {
    setLoading(true);
    try {
      const res = await getActivitiesSync(1, filter);

      setActivities(res.postagens);
      setTotalPage(res.total_pages);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getActivitiesSync = async (pageGet = 1, filter = '') => {
    if (filter) {
      setHasFilter(true);
    }
    const res = await api.post('postagens', {
      page: pageGet,
      tipo: filter,
      categoria: 2,
    });

    if (!res.postagens) {
      throw 'error';
    }

    res.postagens.sort(function (a, b) {
      return new Date(b.data_agenda) - new Date(a.data_agenda);
    });

    return res;
  };

  const getCategories = async () => {
    const res = await api.post('postagens/categorias', {
      tipo: 2,
    });
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

  const toggleFavorite = async (id) => {
    const actHandleNew = activities.filter((act) => act.id !== id);
    const actHandle = activities.find((act) => act.id === id);
    actHandle.isFavorite = !actHandle.isFavorite;

    const newAct = [...actHandleNew, actHandle];
    newAct.sort(function (a, b) {
      return new Date(b.data_agenda) - new Date(a.data_agenda);
    });

    await api.post('postagens/favoritar', { postagens_id: id });
    setActivities(newAct);
  };

  return (
    <View style={commons.body}>
      <Header title="Saúde" />
      <View style={[commons.container, { paddingBottom: 70,flex: 1, }]}>
        {loading && <Loader />}
        {!loading && (
          <ScrollCustom>
            {hasFilter && (
              <TouchableOpacity onPress={resetFilter}>
                <View style={{ alignItems: 'center', marginBottom: 10 }}>
                  <Text
                    style={{
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
            {activities.length === 0 && <NotFound type="Saúde" />}
            {activities.map((act, index) => {
              return (
                <MainCard
                  id={act.id}
                  banner={act.banner}
                  title={act.titulo}
                  isFavorite={act.isFavorite}
                  isSchecule={
                    act.data_agenda &&
                    moment(act.data_agenda).isSame(moment(), 'day')
                      ? true
                      : false
                  }
                  goDetail={() => {
                    navigation.navigate('ActivityDetail', {
                      activity: act,
                      origem: 'Saúde',
                    });
                  }}
                />
              );
            })}
            <Pagination
              totalPage={totalPage}
              page={page}
              getMoreItem={moreActivities}
            />
          </ScrollCustom>
        )}
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Health);
