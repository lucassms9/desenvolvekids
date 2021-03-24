import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from '~/store/ducks/auth';

import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';

import MainCard from '~/components/MainCard';

import Loader from '~/components/Loader';
import Header from '~/components/Header';
import Pagination from '~/components/Pagination';
import InputText from '~/components/InputText';
import NotFound from '~/components/NotFound';

import { commons } from '~/styles';

import api from '~/services/api';
import styles from './styles';

import { iProps, iTip } from './tips';

import { CommonActions } from '@react-navigation/native';

const Tips: React.FC<iProps> = ({ navigation, userEntity: user }:iProps) => {
  const [tips, setTips] = useState<iTip[]>([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');

  const moreTips = async () => {
    if (page < totalPage) {
      setPage(page + 1);
    }

    const res = await getTipsSync(page + 1);
    const allTips = [...tips, ...res.dicas];

    setTips(allTips);
  };

  const getTips = async () => {
 
    try {
      console.log('getTips')
      setLoading(true);
      const res = await getTipsSync();
     
      setTips(res.dicas);
      setTotalPage(res.total_pages);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getTipsSync = async (pageGet = 1): Promise<any> => {
    const res = await api.post<any>('dicas/list', { page: pageGet, busca: filter });
    if (!res.dicas) {
      throw 'error';
    }
    return res;
  };

  const filterTips = async () => {
    getTips();
  };

  useEffect(() => {
    getTips();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('focado na screen dicas');
      setPage(1);
      getTips();
    });

    return unsubscribe;
  }, [navigation]);

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

  return (
    <View style={commons.body}>
      <SafeAreaView>
      <Header title="Dicas" />
        <View style={[commons.container, { paddingBottom: 70 }]}>
          {loading && <Loader />}
          {!loading && (
            <ScrollView>
              <View style={styles.fdr}>
                <InputText
                  value={filter}
                  placeholder="Faça sua busca"
                  containerStyle={styles.wd90}
                  onChangeText={( value : string) => setFilter(value)}
                />
                <Button
                  onPress={filterTips}
                  buttonStyle={styles.btn}
                  icon={
                    <Icon
                      name="navigation"
                      size={17}
                      type="feather"
                      color="white"
                    />
                  }
                />
              </View>
              {tips.length === 0 && <NotFound type="díca" />}
              {tips.map((tip, index) => {
                return (
                  <MainCard
                    key={tip.id}
                    id={tip.id}
                    banner={tip.imagens[0]}
                    title={tip.titulo}
                    desc={tip.descricao_resumida}
                    goDetail={() => {
                      navigation.navigate('TipDetail', { tip });
                    }}
                    titleButton={'LER MAIS'}
                  />
                );
              })}
              <Pagination
                totalPage={totalPage}
                page={page}
                getMoreItem={moreTips}
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

export default connect(mapStateToProps, mapDispatchToProps)(Tips);
