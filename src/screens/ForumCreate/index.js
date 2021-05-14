import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import { Formik } from 'formik';
import api from '~/services/api';
import RNPickerSelect from 'react-native-picker-select';
import Header from '~/components/Header';
import ButtonPrimary from '~/components/ButtonPrimary';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { commons, colors } from '~/styles';

import { Overlay, Input, Button, Icon } from 'react-native-elements';
import validationSchema from './validationSchema';
import styles from './styles';
import IconSuccess from '~/assets/images/icon-success.png';

function ForumCreate({ navigation }) {
  const questionLong = useRef();

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([{ label: '', value: '' }]);
  const [visible, setVisible] = useState(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const submitForm = async (values) => {
    setLoading(true);
    const data = {
      questao_resumida: values.questionShort,
      detalhes_questao: values.questionLong,
      forum_posts_categorias_id: values.category,
    };
    const res = await api.post('forums/add-pergunta', data);
    setLoading(false);
    toggleOverlay();
  };

  const getCategories = async () => {
    const res = await api.post('forums/categories-list');
    const handle = res.categorias.map((cat) => ({
      label: cat.nome,
      value: cat.id,
    }));
    setCategories(handle);
  };

  const goForum = () => {
    navigation.goBack();
  };

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <View style={commons.body}>
      <Header title="Forum" hasBack />
      <SafeAreaView>
        <View style={commons.container}>
          <Formik
            initialValues={{}}
            validationSchema={validationSchema}
            onSubmit={(values) => submitForm(values)}>
            {({ handleSubmit, values, setFieldValue, errors }) => (
              <View>
                <View style={styles.mh5}>
                  <Text style={styles.labelPicker}>Categoria da Pergunta</Text>
                  <RNPickerSelect
                    onValueChange={(text) => setFieldValue('category', text)}
                    value={values.category}
                    items={categories}
                    placeholder={{
                      label: 'Escolha',
                      value: '',
                      color: '#9EA0A4',
                    }}
                    style={{
                      ...pickerSelectStyles,
                      iconContainer: {
                        top: 10,
                        right: 10,
                      },
                    }}
                    useNativeAndroidPickerStyle={false}
                    textInputProps={{ underlineColor: 'yellow' }}
                    Icon={() => {
                      return (
                        <Ionicons name="md-arrow-down" size={24} color="gray" />
                      );
                    }}
                  />
                  {errors.category && (
                    <Text style={styles.error}>{errors.category}</Text>
                  )}
                </View>
                <Input
                  value={values.questionShort}
                  label={'Questão Resumida'}
                  placeholder={'Questão Resumida'}
                  onChangeText={(text) => setFieldValue('questionShort', text)}
                  onSubmitEditing={() =>
                    questionLong.current
                      ? questionLong.current.focus()
                      : () => {}
                  }
                />
                {errors.questionShort && (
                  <Text style={styles.error}>{errors.questionShort}</Text>
                )}
                <Input
                  ref={questionLong}
                  value={values.questionLong}
                  label={'Detalhe sua dúvida'}
                  placeholder={'Detalhe sua dúvida'}
                  onChangeText={(text) => setFieldValue('questionLong', text)}
                />
                {errors.questionLong && (
                  <Text style={styles.error}>{errors.questionLong}</Text>
                )}
                <ButtonPrimary
                  icon={
                    <Icon
                      style={{ marginRight: 5, marginTop: 3 }}
                      color="#fff"
                      size={18}
                      name="save"
                      type="feather"
                    />
                  }
                  loading={loading}
                  onPress={toggleOverlay}
                  text={'SALVAR'}
                />
              </View>
            )}
          </Formik>
        </View>
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 40,
            }}>
            <Image source={IconSuccess} />
            <Text
              style={{
                textAlign: 'center',
                fontWeight: '800',
                marginTop: 15,
                fontSize: 18,
              }}>
              COMENTÁRIO ENVIADO!
            </Text>
            <Text style={{ textAlign: 'center', marginTop: 10, fontSize:14 }}>
              Seu comentário foi enviado e passará por uma moderação antes de
              ser publicado
            </Text>
            <TouchableOpacity onPress={goForum}>
              <Text
                style={{
                  textAlign: 'center',
                  color: '#E84B24',
                  marginTop: 10,
                  fontSize: 18,
                  fontWeight: 'bold',
                }}>
                Voltar para Perguntas
              </Text>
            </TouchableOpacity>
          </View>
        </Overlay>
      </SafeAreaView>
    </View>
  );
}

export default ForumCreate;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginBottom: 20,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: '#000',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 8,
    color: '#000',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
