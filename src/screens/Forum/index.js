import React, { useState, useEffect, useRef, Component } from 'react';
import { View, SafeAreaView, Text, ScrollView } from 'react-native';
import moment from 'moment';
import { useIsFocused } from '@react-navigation/native';
import api from '~/services/api';

import Header from '~/components/Header';
import Loader from '~/components/Loader';
import Pagination from '~/components/Pagination';
import ItemsFilter from '~/components/ItemsFilter';
import NotFound from '~/components/NotFound';

import { commons, colors } from '~/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Divider, Input, Button, Icon } from 'react-native-elements';
import styles from './styles';

class Forum extends Component {
  state = {
    forums: [],
    loading: false,
    answer: null,
    totalPage: 1,
    page: 1,
    hasFilter: false,
    categories: [],
  };

  componentDidMount() {
    this.getForums();
    this.getCategories();
  }

  getCategories = async () => {
    const res = await api.post('forums/categories-list');
    const handle = res.categorias.map((cat) => ({
      label: cat.nome,
      id: cat.id,
    }));

    this.setState({
      categories: handle,
    });
  };

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

  filterForum = (id) => {
    this.getForums(id);
  };

  moreForums = async () => {
    if (this.state.page < this.state.totalPage) {
      this.setState({
        page: this.state.page + 1,
      });
    }

    const res = await this.getForumsSync(this.state.page + 1);
    const allForums = [...this.state.forums, ...res.forums];

    this.setState({
      forums: allForums,
    });
  };

  getForums = async (filterItem = '') => {
    this.setState({ loading: true });

    const res = await this.getForumsSync(1, filterItem);

    this.setState({
      forums: res.forums,
      loading: false,
      totalPage: res.total_pages,
    });
  };

  getForumsSync = async (pageGet = 1, filterItem = '') => {
    const res = await api.post('forums/list', {
      page: pageGet,
      categoria: filterItem,
    });
    if (filterItem) {
      this.setState({ hasFilter: true });
    }
    return res;
  };

  resetFilter = () => {
    this.getForums();
    this.setState({ hasFilter: false });
  };

  componentDidUpdate(prevProps) {
    const { isFocused } = this.props;
    if (isFocused !== prevProps.isFocused) {
      if (isFocused) {
        this.getForums();
        this.setState({ page: 1 });
      }
    }
  }

  render() {
    const { loading, forums } = this.state;
    const { navigation, route } = this.props;
   const {showBack} = route.params
    return (  
      <SafeAreaView style={commons.body}>
        <Header title="Perguntas" />
        <View style={[commons.container, { paddingBottom: 90 }]}>
          {loading && <Loader />}
          {!loading && (
            <ScrollView>
              {this.state.hasFilter && (
                <TouchableOpacity onPress={this.resetFilter}>
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
              <View style={styles.options}>
                <ItemsFilter
                  filterFunc={this.filterForum}
                  items={this.state.categories}
                />
                <TouchableOpacity
                  style={{ marginTop: 10 }}
                  onPress={() => navigation.navigate('ForumCreate')}>
                  <Text style={styles.optionsItem}>CRIAR PERGUNTA</Text>
                </TouchableOpacity>
              </View>
              {forums?.length === 0 && <NotFound type="forum" />}
              {forums?.map((forum, index) => {
                return (
                  <View style={styles.forumItem} key={forum.id}>
                    <View style={styles.mb5}>
                      <Text style={styles.ft18}>{forum.questao_resumida}</Text>
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
                  </View>
                );
              })}
              <Pagination
                totalPage={this.state.totalPage}
                page={this.state.page}
                getMoreItem={this.moreForums}
              />
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

export default function (props) {
  const isFocused = useIsFocused();

  return <Forum {...props} isFocused={isFocused} />;
}
