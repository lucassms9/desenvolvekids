import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  Share,
} from 'react-native';
import { CommonActions } from '@react-navigation/native';
import moment from 'moment';

import MainCard from '~/components/MainCard';

import { Creators as AuthActions } from '~/store/ducks/auth';

import Header from '~/components/Header';
import { commons } from '~/styles';
import Loader from '~/components/Loader';
import ItemsFilter from '~/components/ItemsFilter';
import Pagination from '~/components/Pagination';
import NotFound from '~/components/NotFound';

import api from '~/services/api';

function Activities({
  setNavigation,
  navigation,
  route,
  requestUserData,
  userEntity: user,
}) {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasFilter, setHasFilter] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [checkedAcitivity, setCheckedAcitivity] = useState([]);
  const [stateMaterial, setStateMaterial] = useState('generateList');

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
      categoria: 1,
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
      tipo: 1,
    });
    const handle = res.categorias.map((cat) => ({
      label: cat.nome,
      id: cat.id,
      icon: cat.banner,
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
    requestUserData('');
  }, []);

  useEffect(() => {
    if (user && (!user.plano || !user.plano.id)) {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'Plans' }],
        }),
      );
    }
  }, [user]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('focado na screen videos');
      setPage(1);
      getActivities();
    });

    return unsubscribe;
  }, [navigation]);

  const toggleFavorite = async (id) => {
    activities.forEach(function (act) {
      if (act.id === id) {
        act.isFavorite = !act.isFavorite;
      }
    });

    await api.post('postagens/favoritar', { postagens_id: id });
    setActivities([...activities]);
  };

  const completeList = async () => {
    try {
      console.log(checkedAcitivity);

      const getActivities = [];
      checkedAcitivity.forEach((check) => {
        const item = activities.find((act) => act.id === check);
        getActivities.push(item);
      });

      let textWhats = '';
      console.log(getActivities);
      console.log(getActivities.materiais);

      getActivities.forEach((act) => {
        textWhats += `${act.titulo} \n\n`;

        if (act.materiais && act.materiais.length > 0) {
          act.materiais.forEach((mat) => {
            textWhats += `${mat.nome_material} \n${mat.descricao}  \n`;
          });
        } else {
          textWhats += `Sem materiais cadastrados.`;
        }

        textWhats += `\n\n`;
      });

      console.log(textWhats);
      // Linking.openURL(`whatsapp://send?phone=${whatsappNo}&text=${whatsappMsg}`);
      const result = await Share.share({
        message: textWhats,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }

      setCheckedAcitivity([]);
      setStateMaterial('generateList');
    } catch (error) {
      alert(error.message);
    }
  };

  const initList = () => {
    setStateMaterial('completeList');
  };

  return (
    <SafeAreaView style={commons.body}>
      <Header
        title="Atividades"
        completeList={completeList}
        stateMaterial={stateMaterial}
        initList={initList}
      />
      <View
        style={{
          paddingBottom: 150,
          marginVertical: 10,
          borderRadius: 10,
          backgroundColor: '#fff',
        }}>
        {loading && <Loader />}

        {!loading && (
          <>
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
            <View
              style={{
                flexDirection: 'column',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 10,
                }}>
                <ItemsFilter filterFunc={filterActivities} items={categories} />
              </View>
              <View style={{ borderBottomWidth: 0.5, marginBottom:15, marginTop:5 }}></View>
            </View>
            <ScrollView>
              {activities.length === 0 && <NotFound type="Atividades" />}
              {activities.map((act) => {
                return (
                  <MainCard
                    origin='atividades'
                    stateMaterial={stateMaterial}
                    setCheckedAcitivity={setCheckedAcitivity}
                    checkedAcitivity={checkedAcitivity}
                    key={act.id}
                    id={act.id}
                    desc={act?.desc}
                    icon={act.icon}
                    banner={act.banner}
                    title={act.titulo}
                    isFavorite={act.isFavorite}
                    minAge={act?.faixa_etaria || 'Livre'}
                    isSchecule={
                      act.data_agenda &&
                      moment(act.data_agenda).isSameOrAfter(moment(), 'day')
                        ? moment(act.data_agenda).format('DD/MM')
                        : false
                    }
                    showFavorite
                    completed={act.progresso === act.conteudos.length}
                    progress={`${act.progresso}/${act.conteudos.length}`}
                    toggleFavorite={toggleFavorite}
                    goDetail={() => {
                      navigation.navigate('ActivityDetail', {
                        activity: act,
                        origem: 'Atividades',
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
            </ScrollView>
          </>
        )}
      </View>
    </SafeAreaView>
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
