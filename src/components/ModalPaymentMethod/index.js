import React from 'react';

import { Text, View } from 'react-native';
import { Formik } from 'formik';

import { Overlay, Input } from 'react-native-elements';

import validationSchema from './validation';
import ButtonPrimary from '../ButtonPrimary';
import { commons, colors } from '~/styles';
import { maskExpirationCard } from '~/helpers';

function ModalPaymentMethod({
  visible,
  toggleOverlay,
  status,
  onOClose,
  onSave,
}) {
  return (
    <View style={{ padding: 10 }}>
      <Formik
        initialValues={{
          cardName: 'lucas',
          cardNumber: '5374278550086358',
          cardValid: '10/2021',
          cardCode: '120',
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => onSave(values)}>
        {({ handleSubmit, values, setFieldValue, errors }) => (
          <View>
            <Input
              value={values.cardNumber}
              label={'Número do Cartão'}
              autoCapitalize="none"
              maxLength={16}
              placeholder={'Número do Cartão'}
              onChangeText={(text) => setFieldValue('cardNumber', text)}
            />
            {errors.cardNumber && (
              <Text style={commons.errorWhite}>{errors.cardNumber}</Text>
            )}
            <Input
              value={values.cardName}
              label={'Nome escrito no cartão'}
              autoCapitalize="none"
              placeholder={'Nome escrito no cartão'}
              onChangeText={(text) => setFieldValue('cardName', text)}
            />
            {errors.cardName && (
              <Text style={commons.errorWhite}>{errors.cardName}</Text>
            )}
            <Input
              value={values.cardValid}
              label={'Validade'}
              autoCapitalize="none"
              maxLength={7}
              placeholder={'MM/AAAA'}
              onChangeText={maskExpirationCard(setFieldValue, 'cardValid')}
            />
            {errors.cardValid && (
              <Text style={commons.errorWhite}>{errors.cardValid}</Text>
            )}
            <Input
              value={values.cardCode}
              label={'CCV'}
              autoCapitalize="none"
              placeholder={'CCV'}
              maxLength={3}
              onChangeText={(text) => setFieldValue('cardCode', text)}
            />
            {errors.cardCode && (
              <Text style={commons.errorWhite}>{errors.cardCode}</Text>
            )}

            <View style={{ marginTop: 30 }}>
              <ButtonPrimary
                loading={status === 'loading'}
                text="SALVAR"
                onPress={handleSubmit}
              />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

export default ModalPaymentMethod;
