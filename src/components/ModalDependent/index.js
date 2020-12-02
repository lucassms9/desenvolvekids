import React from 'react';

import { Text, View, SafeAreaView, StyleSheet } from 'react-native';
import { Formik } from 'formik';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-tiny-toast';
import { Input } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';

import validationSchema from './validation';
import ButtonPrimary from '../ButtonPrimary';
import { commons, colors } from '~/styles';
import { maskPhone, maskDate, maskCPF } from '~/helpers';

import styles from './styles';
function ModalChildren({
  visible,
  toggleOverlay,
  initData,
  handleAddress,
  status,
  onOClose,
  kinShips,
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
                  value={values.fiscalNumber}
                  label={'CPF'}
                  autoCapitalize="none"
                  placeholder={'CPF'}
                  onChangeText={maskCPF(setFieldValue, 'fiscalNumber')}
                />
                {errors.fiscalNumber && (
                  <Text style={commons.error}>{errors.fiscalNumber}</Text>
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
                <Input
                  value={values.email}
                  label={'E-mail'}
                  autoCapitalize="none"
                  placeholder={'E-mail'}
                  onChangeText={(text) => setFieldValue('email', text)}
                />
                {errors.email && (
                  <Text style={commons.error}>{errors.email}</Text>
                )}
                <View style={styles.mh5}>
                  <Text style={styles.labelPicker}>Grau de Parentesco</Text>
                  <RNPickerSelect
                    onValueChange={(text) => setFieldValue('parent', text)}
                    value={values.parent}
                    items={kinShips}
                    placeholder={{
                      label: 'Escolha',
                      value: null,
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
                  {errors.parent && (
                    <Text style={styles.error}>{errors.parent}</Text>
                  )}
                </View>

                <Input
                  value={values.phone}
                  label={'Celular'}
                  autoCapitalize="none"
                  placeholder={'Celular'}
                  onChangeText={maskPhone(setFieldValue, 'phone')}
                />
                {errors.phone && (
                  <Text style={commons.error}>{errors.phone}</Text>
                )}

                <Input
                  value={values.password}
                  label={'Senha'}
                  placeholder={'Senha'}
                  secureTextEntry={true}
                  autoCapitalize="none"
                  onChangeText={(text) => setFieldValue('password', text)}
                />
                {errors.password && (
                  <Text style={styles.error}>{errors.password}</Text>
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
