import React from 'react';

import { Text, View, SafeAreaView } from 'react-native';
import { Formik } from 'formik';

import Toast from 'react-native-tiny-toast';
import { Input } from 'react-native-elements';

import validationSchema from './validation';
import ButtonPrimary from '../ButtonPrimary';
import { commons, colors } from '~/styles';
import axios from 'axios';
import { maskCPF, maskDate, maskCEP } from '~/helpers';

function ModalDelivery({
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
                setFieldValue('neighnorhood', bairro);
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
              <View>
                <Input
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
                  value={values.recipient}
                  label={'Nome do Destinatário'}
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

export default ModalDelivery;
