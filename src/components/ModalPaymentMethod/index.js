import React from 'react';

import { Text, View } from 'react-native';
import { Formik } from 'formik';

import { Overlay } from 'react-native-elements';
import InputText from '~/components/InputText';
import validationSchema from './validation';
import ButtonPrimary from '../ButtonPrimary';
import { commons, colors } from '~/styles';

function ModalPaymentMethod({
  visible,
  toggleOverlay,
  handleAdress,
  status,
  onOClose,
}) {
  return (
    <View style={{ padding: 10 }}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleAdress(values)}>
        {({ handleSubmit, values, setFieldValue, errors }) => (
          <View>
            <InputText
              value={values.cardNumber}
              label={'Número do Cartão'}
              autoCapitalize="none"
              placeholder={'Número do Cartão'}
              onChangeText={(text) => setFieldValue('cardNumber', text)}
            />
            {errors.cardNumber && (
              <Text style={commons.error}>{errors.cardNumber}</Text>
            )}
            <InputText
              value={values.cardName}
              label={'Nome escrito no cartão'}
              autoCapitalize="none"
              placeholder={'Nome escrito no cartão'}
              onChangeText={(text) => setFieldValue('cardName', text)}
            />
            {errors.cardName && (
              <Text style={commons.error}>{errors.cardName}</Text>
            )}
            <InputText
              value={values.cardValid}
              label={'Validade'}
              autoCapitalize="none"
              placeholder={'Validade'}
              onChangeText={(text) => setFieldValue('cardValid', text)}
            />
            {errors.cardValid && (
              <Text style={commons.error}>{errors.cardValid}</Text>
            )}
            <InputText
              value={values.cardCode}
              label={'CCV'}
              autoCapitalize="none"
              placeholder={'CCV'}
              onChangeText={(text) => setFieldValue('cardCode', text)}
            />
            {errors.cardCode && (
              <Text style={commons.error}>{errors.cardCode}</Text>
            )}

            <View style={{ marginTop: 30 }}>
              <ButtonPrimary
                loading={status === 'loading'}
                text="SALVAR"
                onPress={onOClose}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

export default ModalPaymentMethod;
