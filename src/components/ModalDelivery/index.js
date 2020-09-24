import React from 'react';

import { Text, View } from 'react-native';
import { Formik } from 'formik';

import { Overlay } from 'react-native-elements';
import InputText from '~/components/InputText';
import validationSchema from './validation';
import ButtonPrimary from '../ButtonPrimary';
import { commons, colors } from '~/styles';

function ModalDelivery({
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
              value={values.zipCode}
              label={'CEP'}
              autoCapitalize="none"
              placeholder={'CEP'}
              onChangeText={(text) => setFieldValue('zipCode', text)}
            />
            {errors.zipCode && (
              <Text style={commons.error}>{errors.zipCode}</Text>
            )}
            <InputText
              value={values.nameAdress}
              label={'Nome do Endereço'}
              autoCapitalize="none"
              placeholder={'Nome do Endereço'}
              onChangeText={(text) => setFieldValue('nameAdress', text)}
            />
            {errors.nameAdress && (
              <Text style={commons.error}>{errors.nameAdress}</Text>
            )}
            <InputText
              value={values.adress}
              label={'Endereço'}
              autoCapitalize="none"
              placeholder={'Endereço'}
              onChangeText={(text) => setFieldValue('adress', text)}
            />
            {errors.adress && (
              <Text style={commons.error}>{errors.adress}</Text>
            )}
            <InputText
              value={values.neighborhood}
              label={'Bairro'}
              autoCapitalize="none"
              placeholder={'Bairro'}
              onChangeText={(text) => setFieldValue('neighnorhood', text)}
            />
            {errors.neighnorhood && (
              <Text style={commons.error}>{errors.neighnorhood}</Text>
            )}
            <InputText
              value={values.city}
              label={'Cidade'}
              autoCapitalize="none"
              placeholder={'Cidade'}
              onChangeText={(text) => setFieldValue('city', text)}
            />
            {errors.city && <Text style={commons.error}>{errors.city}</Text>}
            <InputText
              value={values.state}
              label={'UF'}
              autoCapitalize="none"
              placeholder={'UF'}
              onChangeText={(text) => setFieldValue('state', text)}
            />
            {errors.state && <Text style={commons.error}>{errors.state}</Text>}
            <InputText
              value={values.recipient}
              label={'Destinatário'}
              autoCapitalize="none"
              placeholder={'Destinatário'}
              onChangeText={(text) => setFieldValue('recipient', text)}
            />
            {errors.recipient && (
              <Text style={commons.error}>{errors.recipient}</Text>
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

export default ModalDelivery;
