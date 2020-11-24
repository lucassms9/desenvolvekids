import React, { useEffect, useState } from 'react';

import { CheckBox, Divider, Icon } from 'react-native-elements';
import {
  SafeAreaView,
  Image,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { permissionCamera } from '~/services/permissions';
import cameraService from '~/services/cameraService';
import { useSelector, useDispatch } from 'react-redux';
import { CommonActions } from '@react-navigation/native';

import { ToastActionsCreators } from 'react-native-redux-toast';
import Header from '~/components/Header';
import ButtonPrimary from '~/components/ButtonPrimary';
import { commons, colors } from '~/styles';

import styles from './styles';
import api from '~/services/api';
import { ScrollView } from 'react-native-gesture-handler';

function ActivityComplete({ navigation, route }) {
  const { activity } = route.params;

  const [status, setStatus] = useState('');
  const [imageTake, setImageTake] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState({});

  const dispatch = useDispatch();

  const activityComplete = () => {
    navigation.navigate('ActivityComplete');
  };

  const takePhoto = async () => {
    try {
      await permissionCamera();
      const res = await cameraService();
      console.log(res);
      setImageTake(`data:image/jpeg;base64,${res.data}`);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const getQuestions = async () => {
    const res = await api.post('/postagens/perguntas');
    setQuestions(res.questionarios);
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const handleCheck = (id, res) => {
    const save = {
      ...answer,
      [id]: res,
    };
    setAnswer(save);
  };
  const sendData = async () => {
    setStatus('loading');
    try {
      const ansHandle = Object.entries(answer).map(([key, value]) => ({
        perguntaId: key,
        reposta: value,
      }));

      const data = {
        postagens_id: activity.id,
        resposta: ansHandle,
        imgBase64: imageTake,
        dificuldade: difficulty,
      };
      const res = await api.post('/postagens/finalizando-postagem', data);
      dispatch(
        ToastActionsCreators.displayInfo('Atividade finalizado com sucesso'),
      );
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: 'Activities' }],
        }),
      );
      navigation.navigate('Activities');
    } catch (error) {
      return dispatch(ToastActionsCreators.displayError(error.message, 5000));
    } finally {
      setStatus('');
    }
  };

  return (
    <View style={commons.body}>
      <Header title="Atividade" hasBack />
      <SafeAreaView style={styles.container}>
        <View style={[commons.container, styles.container]}>
          <View style={styles.fx02}>
            <Text style={styles.title}>
              Parabéns! atividade concluída com sucesso!
            </Text>
          </View>
          <View style={styles.fx02}>
            <ButtonPrimary
              text={!imageTake ? 'Enviar Comprovação' : 'Reenviar Comprovação'}
              onPress={takePhoto}
              icon={
                imageTake ? (
                  <Icon name="check" type="feather" color="#fff" />
                ) : null
              }
            />

            <View>
              {/* {imageTake && (
                <Image
                  style={{ marginTop: 10 }}
                  width={200}
                  height={200}
                  source={{
                    uri: imageTake,
                  }}
                />
              )} */}
            </View>
          </View>

          <View style={styles.container}>
            {questions.length > 0 && (
              <View>
                <Text style={styles.title}>Questionário:</Text>
                <View style={styles.containerQuestions}>
                  <ScrollView>
                    {questions.map((quest) => {
                      return (
                        <View key={quest.id}>
                          <Text style={styles.questionItem}>
                            {quest.pergunta}
                          </Text>
                          {quest.possiveis_respostas.map((res, index) => {
                            return (
                              <View>
                                <CheckBox
                                  title={res}
                                  textStyle={styles.colorItem}
                                  checkedColor={colors.primary}
                                  uncheckedColor={colors.primary}
                                  containerStyle={styles.checkBox}
                                  onPress={() => {
                                    handleCheck(quest.id, res);
                                  }}
                                  checked={answer[quest.id] === res}
                                />
                              </View>
                            );
                          })}
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>
              </View>
            )}

            <View>
              <Text style={[styles.title, { marginBottom: 10 }]}>
                Dificuldade:
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                }}>
                <TouchableOpacity onPress={() => setDifficulty('Vermelho')}>
                  <View
                    style={[
                      styles.itemDifficultyRed,
                      { opacity: difficulty === 'Vermelho' ? 0.4 : 1 },
                    ]}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setDifficulty('Amarelo')}>
                  <View
                    style={[
                      styles.itemDifficultyYellow,
                      {
                        opacity: difficulty === 'Amarelo' ? 0.4 : 1,
                      },
                    ]}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setDifficulty('Verde')}>
                  <View
                    style={[
                      styles.itemDifficultyGreen,
                      {
                        opacity: difficulty === 'Verde' ? 0.4 : 1,
                      },
                    ]}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View
            style={{
              flex: 0.1,
              flexDirection: 'column',
              justifyContent: 'flex-end',
              alignContent: 'flex-end',
            }}>
            <ButtonPrimary
              text="Enviar Dados"
              loading={status === 'loading'}
              onPress={sendData}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default ActivityComplete;
