import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, ScrollView } from 'react-native';
import moment from 'moment';

import api from '~/services/api';

import Header from '~/components/Header';
import Loader from '~/components/Loader';

import { commons, colors } from '~/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Divider } from 'react-native-elements';

function Forum({ navigation }) {
  const [forums, setForums] = useState([]);
  const [loading, setLoading] = useState(false);

  const getForums = async () => {
    setLoading(true);

    const res = await api.post('forums/list');

    setForums(res.forums);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getForums();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    getForums();
  }, []);

  return (
    <View style={commons.body}>
      <Header title="Forum" />
      <SafeAreaView>
        <View style={[commons.container, { paddingBottom: 90 }]}>
          {loading && <Loader />}
          {!loading && (
            <ScrollView>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  marginBottom: 10,
                }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ForumCreate')}>
                  <Text style={{ color: '#fff', fontWeight: '700' }}>
                    Criar Pergunta
                  </Text>
                </TouchableOpacity>
              </View>
              {forums.map((forum, index) => {
                return (
                  <View
                    style={{
                      backgroundColor: '#fff',
                      marginBottom: 15,
                      height: 400,
                      padding: 10,
                      borderRadius: 10,
                    }}
                    key={forum.id}>
                    <View style={{ marginBottom: 5 }}>
                      <Text style={{ fontSize: 18 }}>
                        {forum.questao_resumida}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: '#eee',
                        borderRadius: 10,
                        padding: 10,
                        height: 340,
                      }}>
                      <ScrollView>
                        {forum.respostas.map((resp, index) => {
                          return (
                            <View
                              style={{
                                marginBottom: 10,
                              }}>
                              <View style={{ flexDirection: 'row' }}>
                                <Text
                                  style={{ fontWeight: '700', marginRight: 5 }}>
                                  {resp.cliente}
                                </Text>
                                <Text>{`respondeu em: ${moment(
                                  resp.data_cadastro,
                                ).format('DD/MM/YYYY')}`}</Text>
                              </View>

                              <Text>{resp.resposta}</Text>
                              <Divider
                                style={{
                                  backgroundColor: colors.blue,
                                  marginTop: 5,
                                }}
                              />
                            </View>
                          );
                        })}
                      </ScrollView>
                    </View>
                  </View>
                );
              })}
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Forum;
