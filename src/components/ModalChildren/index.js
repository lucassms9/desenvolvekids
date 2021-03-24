import React from 'react';

import { Text, View, SafeAreaView } from 'react-native';
import { Formik } from 'formik';

import Toast from 'react-native-tiny-toast';
import { Input } from 'react-native-elements';

import validationSchema from './validation';
import ButtonPrimary from '../ButtonPrimary';
import { commons, colors } from '~/styles';
import { maskPhone, maskDate } from '~/helpers';

function ModalChildren({
  visible,
  toggleOverlay,
  initData,
  handleAddress,
  status,
  onOClose,
}) {
  return (
    <SafeAreaView>
      <View style={{ padding: 10 }}>
        <Formik
          initialValues={initData}
          validationSchema={validationSchema}
          onSubmit={(values) => handleAddress(values)}>
          {({ handleSubmit, values, setFieldValue, errors }) => {
            return (
              <View>
                <Input
                  value={values.name}
                  label={'Nome'}
                  autoCapitalize="none"
                  placeholder={'Nome'}
                  onChangeText={(text) => setFieldValue('name', text)}
                />
                {errors.name && (
                  <Text style={commons.error}>{errors.name}</Text>
                )}
                <Input
                  value={values.nickName}
                  label={'Apelido'}
                  autoCapitalize="none"
                  placeholder={'Apelido'}
                  onChangeText={(text) => setFieldValue('nickName', text)}
                />
                {errors.nickName && (
                  <Text style={commons.error}>{errors.nickName}</Text>
                )}
               
                <Input
                  value={values.birthDate}
                  label={'Data de Nascimento'}
                  autoCapitalize="none"
                  placeholder={'99/99/9999'}
                  onChangeText={maskDate(setFieldValue, 'birthDate')}
                />
                {errors.birthDate && (
                  <Text style={commons.error}>{errors.birthDate}</Text>
                )}
                <View style={{ marginTop: 30 }}>
                  <ButtonPrimary
                    loading={status === 'loading'}
                    text="SALVAR"
                    onPress={handleSubmit}
                  />
                </View>
              </View>
            );
          }}
        </Formik>
      </View>
    </SafeAreaView>
  );
}

export default ModalChildren;
