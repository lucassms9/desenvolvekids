import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import api from '~/services/api';

import { colors } from '~/styles';

const AvaliationScreen = () => {
  const navigation = useNavigation();
  const [questions, setQuestions] = useState([]);

  const handleItem = (quest) => {
    navigation.navigate('AvaliationQuestions', { subQuestion: quest });
  };

  const getQuestions = async () => {
    const { questionarios } = await api.post('questionarios');
    console.log(questionarios);
    if (questionarios) {
      const handle = questionarios.filter(
        (quest) => quest.sub_cat_content.length > 0,
      );
      setQuestions(handle);
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <ScrollView>
      {questions.map((quest) => (
        <View
          key={quest.categoria.id}
          style={{ marginTop: 15, borderBottomWidth: 1 }}>
          <View>
            <Text style={{ fontSize: 20 }}>{quest.categoria.nome}</Text>
          </View>
          <ScrollView
            style={{
              marginTop: 15,
              padding: 10,
            }}>
            {quest.sub_cat_content.map((questSub) => (
              <TouchableOpacity
                key={questSub.id}
                onPress={() => handleItem(questSub)}>
                <View
                  style={{
                    justifyContent: 'space-between',
                    alignContent: 'center',
                    backgroundColor: colors.secondary,
                    flexDirection: 'row',
                    marginBottom: 20,
                    padding: 10,
                  }}>
                  <Text style={{ color: colors.white, fontSize: 18 }}>
                    {questSub.nome}
                  </Text>
                  <Icon
                    name="chevron-right"
                    type="feather"
                    color={colors.white}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
};

export default AvaliationScreen;
