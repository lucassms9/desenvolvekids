import React, { useState, useRef, useMemo, useEffect } from 'react';

import { View, Text, SafeAreaView, useWindowDimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

import { PricingCard, Input, Tab, Icon } from 'react-native-elements';
import Header from '~/components/Header';
import NotFound from '~/components/NotFound';
import moment from 'moment';
import { maskMoney } from '~/helpers';
import { colors, commons } from '~/styles';
import ButtonPrimary from '~/components/ButtonPrimary';
import ButtonSecondary from '~/components/ButtonSecondary';
import api from '~/services/api';
import { ToastActionsCreators } from 'react-native-redux-toast';
import { useDispatch } from 'react-redux';

function AvaliationQuestions() {
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { subQuestion: subQuestionParam } = route.params;
  const [subQuestion, setSubQuestion] = useState({ questions: [] });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(subQuestionParam)
    setSubQuestion(subQuestionParam);
  }, [subQuestionParam]);

  const updateMark = (sub) => {
    subQuestion.questions.forEach((item) => {
      if (item.id === sub.id) {
        item.mark = !item?.mark;
      }
    });

    setSubQuestion({ ...subQuestion });
  };

  const saveData = async () => {
    try {
      setLoading(true);
      console.log(subQuestion);
      const body = subQuestion.questions.map((ques) => ({
        questionarios_id: ques.id,
        resposta: ques?.mark ? 1 : 0,
      }));

      const res = await api.post('questionarios/respostas', {
        respostas: body,
      });
      navigation.goBack();
      dispatch(
        ToastActionsCreators.displayInfo('Atividade finalizado com sucesso'),
      );
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={commons.body}>
      <Header title={subQuestion?.nome} hasBack />
      <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
        <View style={[commons.container, { flex: 1 }]}>
          {subQuestion?.questions.map((quest) => (
            <View style={{ marginHorizontal: 20 }}>
              <View style={{ marginBottom: 20 }}>
                <Text style={{ color: '#fff', fontSize: 20 }}>
                  {quest.pergunta}
                </Text>
              </View>
              <ButtonSecondary
                onPress={() => updateMark(quest)}
                text="Completo"
                icon={
                  quest?.mark && (
                    <Icon name="check" type="feather" color="#fff" />
                  )
                }
              />
            </View>
          ))}
          <View style={{ marginHorizontal: 20, marginTop: 40 }}>
            <ButtonPrimary
              onPress={saveData}
              text="Salvar Dados"
              loading={loading}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default AvaliationQuestions;
