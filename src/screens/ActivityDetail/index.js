import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useIsFocused } from '@react-navigation/native';
import { Creators as AuthActions } from '~/store/ducks/auth';
import { useSelector, useDispatch } from 'react-redux';

import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import {
  SafeAreaView,
  ScrollView,
  View,
  Platform,
  TouchableOpacity,
} from 'react-native';

import { ToastActionsCreators } from 'react-native-redux-toast';

import { Button } from 'react-native-elements';

import api from '~/services/api';

import Header from '~/components/Header';
import ButtonPrimary from '~/components/ButtonPrimary';
import MainCarousel from '~/components/MainCarousel';
import ItemPage from '~/components/ItemPage';
import { commons, colors } from '~/styles';

import styles from './styles';

function ActivityDetail({ navigation, route }) {
  const { activity, origem } = route.params;

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(moment());
  const [currentPage, setCurrentPage] = useState(0);
  const [isLastPage, setIsLastPage] = useState(false);
  const [imagesCarousel, setImagesCarousel] = useState([]);
  const [schedule, setSchedule] = useState(null);

  const dispatch = useDispatch();

  const activityComplete = () => {
    navigation.navigate('ActivityComplete', {
      activity,
    });
  };

  //responsavel por renderizar as imagens
  const renderImages = (image) => {
    imagesCarousel.push([image.conteudo]);
  };

  const nextPage = () => {
    api.post('postagens/completar', {
      conteudos_id: activity.conteudos[currentPage].id,
      postagens_id: activity.id,
    });

    if (isLastPage) {
      return activityComplete();
    }

    return setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    setCurrentPage(0);
    setIsLastPage(false);

    if (activity.data_agenda) {
      setDate(moment(activity.data_agenda, 'YYYY-MM-DD'));
    } else {
      setDate('');
    }
  }, []);
  //definir se e a ultima page ou nao
  useEffect(() => {
    //seta as imagens
    const imagens = activity.conteudos[currentPage].conteudos_itens
      .filter((item) => {
        if (item.tipo === 'imagem') {
          return item;
        }
      })
      .map((img) => img.conteudo);
    if (imagens.length > 0) {
      setImagesCarousel(imagens);
    } else {
      setImagesCarousel([]);
    }
    if (activity.conteudos.length === 0) {
      return setIsLastPage(true);
    }

    if (activity.conteudos.length - 1 === currentPage) {
      return setIsLastPage(true);
    }

    return setIsLastPage(false);
  }, [currentPage]);

  const backPage = () => {
    if (currentPage > 0) {
      return setCurrentPage(currentPage - 1);
    }
  };

  const sendSchedule = async () => {
    console.log(date);
    api.post('postagens/agendar', {
      postagens_id: activity.id,
      data_agendamento: moment(date, 'DD/MM/YYYY').format('YYYY-MM-DD'),
    });

    return dispatch(
      ToastActionsCreators.displayInfo('Atividade Agendada com sucesso.'),
    );
  };

  const handleConfirm = (date) => {
    console.warn('A date has been picked: ', date);
    setDate(date);
  };

  return (
    <View style={commons.body}>
      <Header title={origem} hasBack />
      <SafeAreaView>
        <View style={[commons.container, { paddingBottom: 100 }]}>
          <ScrollView>
            {origem === 'Atividades' && (
              <View style={styles.fdr}>
                <DatePicker
                  style={{ width: 200 }}
                  date={date}
                  mode="date"
                  placeholder="Selecione a Data"
                  format="DD/MM/YYYY"
                  confirmBtnText="Confirmar"
                  cancelBtnText="Cancelar"
                  onDateChange={handleConfirm}
                  customStyles={{
                    dateIcon: {
                      position: 'absolute',
                      left: 0,
                      top: 4,
                      marginLeft: 0,
                      color: '#fff',
                    },
                    dateText: {
                      color: '#fff',
                    },
                    dateInput: {
                      marginLeft: 36,
                    },
                  }}
                />
                <ButtonPrimary
                  onPress={sendSchedule}
                  buttonStyle={styles.btn}
                  text="Agendar"
                />
              </View>
            )}

            {/* <View style={{}}>
              {imagesCarousel.length > 0 && (
                <MainCarousel imagens={imagesCarousel} />
              )}
            </View> */}

            <View style={{ marginTop: 10, marginHorizontal: 8 }}>
              <View>
                {activity.conteudos[currentPage].conteudos_itens.map((item) => (
                  <ItemPage item={item} />
                ))}
              </View>
              <View
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{ width: '45%' }}>
                  {currentPage > 0 && (
                    <ButtonPrimary text="Voltar" onPress={backPage} />
                  )}
                </View>
                {origem === 'Atividades' && (
                  <View style={{ width: '45%' }}>
                    <ButtonPrimary
                      text={isLastPage ? 'Concluir Atividade' : 'Avançar'}
                      onPress={nextPage}
                    />
                  </View>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default ActivityDetail;
