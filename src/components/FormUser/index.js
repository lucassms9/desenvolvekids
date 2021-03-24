import React, { useRef, useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import Toast from 'react-native-tiny-toast';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import ButtonPrimary from '~/components/ButtonPrimary';

import styles from './styles';
import { Input, Icon } from 'react-native-elements';

import { maskCPF, maskDate, maskPhone,maskCEP } from '~/helpers';
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

  const [parent, setParent] = useState('');

  const parantHandle = useMemo(() => {
    if (kinShips) {
      const getParent = kinShips.find((kin) => kin.value === parent);
      return String(getParent?.label).toLowerCase();
    }
  }, [parent]);

  return (
    <Formik
      initialValues={valuesInit}
      validationSchema={
        mode === 'update' ? validationUpdateSchema : validationSchema
      }
      onSubmit={(values) => submitForm(values)}>
      {({ handleSubmit, values, setFieldValue, errors }) => {
        const loadingCep = async (state) => {
          if (state) {
            setFieldValue('address', '...');
            setFieldValue('state', '...');
            setFieldValue('city', '...');
          } else {
            setFieldValue('address', '');
            setFieldValue('state', '');
            setFieldValue('city', '');
          }
        };

        const getCep = async (cep) => {
          const response = await axios.get(
            `https://viacep.com.br/ws/${cep}/json/`,
          );

          const {
            data: { logradouro, uf, localidade, erro, bairro, complemento },
          } = response;
          if (!erro) {
            setFieldValue('complement', complemento);
            setFieldValue('neighborhood', bairro);
            setFieldValue('address', logradouro);
            setFieldValue('state', uf);
            setFieldValue('city', localidade);
          } else {
            loadingCep(false);
            setFieldValue('zipCode', '');
            Toast.show('CEP não encontrado.', {
              duration: 2000,
              containerStyle: {
                backgroundColor: '#ff3d3d',
                borderRadius: 15,
              },
            });
          }
        };

        const handleBlurCep = async (e) => {
          loadingCep(true);
          let cep = e.nativeEvent.text;
          cep = cep.replace(/\D/, '');
          if (cep !== '') {
            const validacep = /^[0-9]{8}$/;
            // Valida o formato do CEP.
            if (validacep.test(cep)) {
              getCep(cep);
            } else {
              Toast.show('Formato de CEP inválido.', {
                position: Toast.position.center,
                duration: 2000,
                containerStyle: {
                  backgroundColor: '#ff3d3d',
                  borderRadius: 15,
                },
              });
              loadingCep(false);
            }
          }
        };

        return (
          <ScrollView>
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
                onValueChange={(text) => {
                  const getParent = kinShips.find((kin) => kin.value === text);
                  setFieldValue(
                    'parentLabel',
                    String(getParent?.label).toLowerCase(),
                  );

                  setParent(text);
                  setFieldValue('parent', text);
                }}
                value={values.parent}
                items={kinShips}
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
              {errors.parent && (
                <Text style={styles.error}>{errors.parent}</Text>
              )}
            </View>

            {parantHandle === 'outros' && (
              <>
                <Input
                  inputStyle={commons.textWhite}
                  labelStyle={commons.textWhite}
                  value={values.parentOther}
                  label={'Detalhar Parentesco:'}
                  placeholder={'Detalhar Parentesco'}
                  onChangeText={(text) => setFieldValue('parentOther', text)}
                />
                {errors.parentOther && (
                  <Text style={commons.error}>{errors.parentOther}</Text>
                )}
              </>
            )}
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
              value={values.zipCode}
              label={'CEP'}
              onEndEditing={handleBlurCep}
              autoCapitalize="none"
              placeholder={'CEP'}
              onChangeText={maskCEP(setFieldValue, 'zipCode')}
            />
            {errors.zipCode && (
              <Text style={commons.error}>{errors.zipCode}</Text>
            )}
            <Input
            inputStyle={commons.textWhite}
            labelStyle={commons.textWhite}
              value={values.nameAddress}
              label={'Nome do Endereço'}
              autoCapitalize="none"
              placeholder={'Nome do Endereço'}
              onChangeText={(text) => setFieldValue('nameAddress', text)}
            />
            {errors.nameAddress && (
              <Text style={commons.error}>{errors.nameAddress}</Text>
            )}
            <Input
            inputStyle={commons.textWhite}
            labelStyle={commons.textWhite}
              value={values.address}
              label={'Endereço'}
              autoCapitalize="none"
              placeholder={'Endereço'}
              onChangeText={(text) => setFieldValue('address', text)}
            />
            {errors.address && (
              <Text style={commons.error}>{errors.address}</Text>
            )}
            <Input
            inputStyle={commons.textWhite}
            labelStyle={commons.textWhite}
              value={values.number}
              label={'Número'}
              autoCapitalize="none"
              placeholder={'Número'}
              onChangeText={(text) => setFieldValue('number', text)}
            />
            {errors.number && (
              <Text style={commons.error}>{errors.number}</Text>
            )}
            <Input
            inputStyle={commons.textWhite}
            labelStyle={commons.textWhite}
              value={values.neighborhood}
              label={'Bairro'}
              autoCapitalize="none"
              placeholder={'Bairro'}
              onChangeText={(text) => setFieldValue('neighborhood', text)}
            />
            {errors.neighborhood && (
              <Text style={commons.error}>{errors.neighborhood}</Text>
            )}
            <Input
            inputStyle={commons.textWhite}
            labelStyle={commons.textWhite}
              value={values.complement}
              label={'Complemento'}
              autoCapitalize="none"
              placeholder={'Complemento'}
              onChangeText={(text) => setFieldValue('complement', text)}
            />
            {errors.complement && (
              <Text style={commons.error}>{errors.complement}</Text>
            )}

            <Input
            inputStyle={commons.textWhite}
            labelStyle={commons.textWhite}
              value={values.city}
              label={'Cidade'}
              autoCapitalize="none"
              placeholder={'Cidade'}
              onChangeText={(text) => setFieldValue('city', text)}
            />
            {errors.city && (
              <Text style={commons.error}>{errors.city}</Text>
            )}
            <Input
            inputStyle={commons.textWhite}
            labelStyle={commons.textWhite}
              value={values.state}
              label={'UF'}
              autoCapitalize="none"
              placeholder={'UF'}
              onChangeText={(text) => setFieldValue('state', text)}
            />
            {errors.state && (
              <Text style={commons.error}>{errors.state}</Text>
            )}
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
              onSubmitEditing={() =>
                passwordConfirmRef.current
                  ? passwordConfirmRef.current.focus()
                  : {}
              }
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
          </ScrollView>
        );
      }}
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
