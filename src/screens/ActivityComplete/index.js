import React, { useEffect, useState } from 'react';

import { CheckBox, Divider, Icon } from 'react-native-elements';
import {
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { permissionCamera } from '~/services/permissions';

import { useSelector, useDispatch } from 'react-redux';
import { CommonActions } from '@react-navigation/native';

import { ToastActionsCreators } from 'react-native-redux-toast';
import Header from '~/components/Header';
import CameraModal from '~/components/CameraModal';
import ButtonPrimary from '~/components/ButtonPrimary';
import { commons, colors } from '~/styles';

import styles from './styles';
import api from '~/services/api';

function ActivityComplete({ navigation, route }) {
  const { activity } = route.params;

  const [status, setStatus] = useState('');
  const [imageTake, setImageTake] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [difficulty, setDifficulty] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answer, setAnswer] = useState({});

  const dispatch = useDispatch();

  const activityComplete = () => {
    navigation.navigate('ActivityComplete');
  };

  const takePhoto = async (base64) => {
    try {
      console.log(imageTake)
      setImageTake(`${base64}`);
    } catch (error) {

      alert(error);
      alert(error.message);
      alert(error.stack);
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
      console.log(res);
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

  const showCameraHandleModal = () => {
    setShowCameraModal(true);
  }
  const closeCameraHandleModal = () => {
    setShowCameraModal(false);
  }



  return (
    <View style={commons.body}>
      <Header title="Atividade" hasBack />
      <SafeAreaView style={styles.container}>
        <ScrollView style={[commons.container, styles.container]}>

        <View style={[styles.fx02, { marginVertical: 10 }]}>
            <ButtonPrimary
              text={!imageTake ? 'Registre este momento' : 'Reenviar Comprovação'}
              onPress={showCameraHandleModal}
              icon={
                imageTake ? (
                  <Icon name="check" type="feather" color="#fff" />
                ) : (<Icon name="camera" type="feather" color="#fff" />)
              }
            />
          </View>

          <View style={[styles.fx02,{flexDirection:'column', marginBottom:10}]}>
          <Icon name="check" type="feather" color="#0f0" size={25} />
            <Text style={[styles.title, {color:'#0f0'}]}>
              Parabéns! atividade concluída com sucesso! 
            </Text>
           
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
                  marginBottom: 10,
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
          <CameraModal
          navigation={navigation}
          visible={showCameraModal}
          handleSavePhoto={takePhoto}
          handleCloseModal={closeCameraHandleModal}
        />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default ActivityComplete;
