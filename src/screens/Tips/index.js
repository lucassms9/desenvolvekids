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

function Tips({ navigation }) {
  const [tips, setTips] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const moreTips = async () => {
    if (page < totalPage) {
      setPage(page + 1);
    }

    const res = await getTipsSync(page + 1);
    const allTips = [...tips, ...res.dicas];

    setTips(allTips);
  };

  const getTips = async () => {
    setLoading(true);
    const res = await getTipsSync();

    setTips(res.dicas);
    setTotalPage(res.total_pages);
    setLoading(false);
  };

  const getTipsSync = async (pageGet = 1) => {
    const res = await api.post('dicas/list', { page: pageGet });
    return res;
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

  return (
    <View style={commons.body}>
      <Header title="Dicas" />
      <SafeAreaView>
        <View style={[commons.container, { paddingBottom: 70 }]}>
          {loading && <Loader />}
          {!loading && (
            <ScrollView>
              {tips.map((tip, index) => {
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
                            navigation.navigate('TipDetail', { tip });
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
