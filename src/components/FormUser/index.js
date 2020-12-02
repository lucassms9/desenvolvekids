import React, { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { connect } from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import ButtonPrimary from '~/components/ButtonPrimary';

import styles from './styles';
import { Input, Icon } from 'react-native-elements';

import { maskCPF, maskDate, maskPhone } from '~/helpers';
import { commons } from '~/styles';

import validationSchema from './validation';
import validationUpdateSchema from './validationUpdate';

function Form({ submitForm, status, textButton, initData, mode, kinShips }) {
  const { email } = initData;
  const input = useRef();
  const fiscalNumberRef = useRef();
  const birthDateRef = useRef();
  const emailRef = useRef();

  const passwordRef = useRef();
  const phoneRef = useRef();
  const passwordConfirmRef = useRef();
  const valuesInit = email
    ? {
        ...initData,
      }
    : {};

  return (
    <Formik
      initialValues={valuesInit}
      validationSchema={
        mode === 'update' ? validationUpdateSchema : validationSchema
      }
      onSubmit={(values) => submitForm(values)}>
      {({ handleSubmit, values, setFieldValue, errors }) => (
        <View>
          <Input
            inputStyle={commons.textWhite}
            labelStyle={commons.textWhite}
            value={values.name}
            label={'Nome'}
            placeholder={'Nome'}
            onChangeText={(text) => setFieldValue('name', text)}
            onSubmitEditing={() =>
              input.current ? input.current.focus() : () => {}
            }
          />
          {errors.name && <Text style={styles.error}>{errors.name}</Text>}

          <Input
            inputStyle={commons.textWhite}
            labelStyle={commons.textWhite}
            value={values.fiscalNumber}
            label={'CPF'}
            ref={fiscalNumberRef}
            placeholder={'CPF'}
            onChangeText={maskCPF(setFieldValue, 'fiscalNumber')}
            onSubmitEditing={() => birthDateRef.current.focus()}
          />
          {errors.fiscalNumber && (
            <Text style={styles.error}>{errors.fiscalNumber}</Text>
          )}
          <Input
            inputStyle={commons.textWhite}
            labelStyle={commons.textWhite}
            ref={birthDateRef}
            value={values.birthDate}
            label={'Data de Nascimento'}
            placeholder={'Data de Nascimento'}
            onChangeText={maskDate(setFieldValue, 'birthDate')}
            onSubmitEditing={() => emailRef.current.focus()}
          />
          {errors.birthDate && (
            <Text style={styles.error}>{errors.birthDate}</Text>
          )}
          <Input
            inputStyle={commons.textWhite}
            labelStyle={commons.textWhite}
            value={values.email}
            label={'E-mail'}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder={'E-mail'}
            ref={emailRef}
            onChangeText={(text) => setFieldValue('email', text)}
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}
          <View style={styles.mh5}>
            <Text style={styles.labelPicker}>Grau de Parentesco</Text>
            <RNPickerSelect
              onSubmitEditing={() => phoneRef.current.focus()}
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
                return <Ionicons name="md-arrow-down" size={24} color="gray" />;
              }}
            />
            {errors.parent && <Text style={styles.error}>{errors.parent}</Text>}
          </View>
          <Input
            inputStyle={commons.textWhite}
            labelStyle={commons.textWhite}
            ref={phoneRef}
            value={values.phone}
            label={'Celular'}
            placeholder={'Celular'}
            onChangeText={maskPhone(setFieldValue, 'phone')}
            onSubmitEditing={() => passwordRef.current.focus()}
          />
          {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

          <Input
            inputStyle={commons.textWhite}
            labelStyle={commons.textWhite}
            ref={passwordRef}
            value={values.password}
            label={'Senha'}
            placeholder={'Senha'}
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={(text) => setFieldValue('password', text)}
            onSubmitEditing={() => passwordConfirmRef.current.focus()}
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}
          {mode !== 'update' && (
            <Input
              inputStyle={commons.textWhite}
              labelStyle={commons.textWhite}
              value={values.passwordConfirm}
              ref={passwordConfirmRef}
              label={'Confirmar Senha'}
              placeholder={'Confirmar Senha'}
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={(text) => setFieldValue('passwordConfirm', text)}
            />
          )}
          {errors.passwordConfirm && (
            <Text style={styles.error}>{errors.passwordConfirm}</Text>
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
            loading={status === 'loading'}
            onPress={handleSubmit}
            text={textButton ? textButton : 'Enviar'}
          />
        </View>
      )}
    </Formik>
  );
}

const mapStateToProps = ({ auth }) => ({
  auth,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Form);

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginBottom: 20,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: '#fff',
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
    color: '#fff',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
