import React, { useState, useEffect, useRef, Component } from 'react';
import { View, SafeAreaView, Text, ScrollView } from 'react-native';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';
import api from '~/services/api';

import Header from '~/components/Header';
import Loader from '~/components/Loader';

import { commons, colors } from '~/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Divider, Input, Button, Icon } from 'react-native-elements';
import styles from './styles';

class Forum extends Component {
  state = {
    forums: [],
    loading: false,
    answer: null,
  };

  componentDidMount() {
    this.getForums();
    console.log('1');
  }
  addAnswer = async (id) => {
    const { answer } = this.state;
    if (!answer) {
      return alert('O campo resposta não pode estar vazio.');
    }

    const { forums } = this.state;
    const data = {
      resposta: answer,
      forum_id: id,
    };

    const resp = await api.post('forums/add-resposta', data);
    const forum = forums.find((forum) => forum.id === id);

    forum.respostas.push(resp.resposta);

    const allForums = forums.filter((forum) => forum.id !== id);

    const newForum = [...allForums, forum];
    newForum.sort(function (a, b) {
      return a.id - b.id;
    });
    this.setState({
      forums: newForum,
      answer: '',
    });

    this.refs[`myscroll${id}`].scrollToEnd();
  };

  getForums = async () => {
    this.setState({
      loading: true,
    });

    const res = await api.post('forums/list');

    this.setState({
      forums: res.forums,
      loading: false,
    });
  };
  componentDidUpdate(prevProps) {
    const { isFocused } = this.props;
    if (isFocused !== prevProps.isFocused) {
      if (isFocused) {
        this.getForums();
      }
    }
  }

  render() {
    const { loading, forums } = this.state;
    const { navigation } = this.props;
    return (
      <View style={commons.body}>
        <Header title="Forum" />
        <SafeAreaView>
          <View style={[commons.container, { paddingBottom: 90 }]}>
            {loading && <Loader />}
            {!loading && (
              <ScrollView>
                <View style={styles.options}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ForumCreate')}>
                    <Text style={styles.optionsItem}>CRIAR PERGUNTA</Text>
                  </TouchableOpacity>
                </View>
                {forums.map((forum, index) => {
                  return (
                    <View style={styles.forumItem} key={forum.id}>
                      <View style={styles.mb5}>
                        <Text style={styles.ft18}>
                          {forum.questao_resumida}
                        </Text>
                      </View>
                      <View style={styles.forumBody}>
                        <ScrollView
                          contentContainerStyle={styles.pd40}
                          ref={`myscroll${forum.id}`}>
                          {forum.respostas.length === 0 ? (
                            <Text>Aguradando respostas.</Text>
                          ) : (
                            forum.respostas.map((resp, index) => {
                              return (
                                <View style={styles.mb10}>
                                  <View style={styles.fdr}>
                                    <Text style={styles.labelName}>
                                      {resp.cliente}
                                    </Text>
                                    <Text>{`respondeu em: ${resp.data_cadastro}`}</Text>
                                  </View>

                                  <Text>{resp.resposta}</Text>
                                  <Divider style={styles.divider} />
                                </View>
                              );
                            })
                          )}
                        </ScrollView>
                      </View>

                      <View style={styles.fdr}>
                        <Input
                          placeholder="Digite sua Resposta"
                          containerStyle={styles.wd90}
                          onChangeText={(value) =>
                            this.setState({ answer: value })
                          }
                        />
                        <Button
                          onPress={() => this.addAnswer(forum.id)}
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
}

export default function (props) {
  const isFocused = useIsFocused();

  return <Forum {...props} isFocused={isFocused} />;
}
