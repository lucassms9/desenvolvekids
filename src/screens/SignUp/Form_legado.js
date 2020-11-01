import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as AuthActions } from '~/store/ducks/auth';
import * as yup from 'yup';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RNPickerSelect from 'react-native-picker-select';
import ButtonPrimary from '~/components/ButtonPrimary';
import InputText from '~/components/InputText';
import styles from './styles';

const validationSchema = yup.object().shape({
  //   email: yup.string().required('Campo obrigatório'),
});

function Form(props) {
  console.log(props);
  const { signUpRequest, status } = props;

  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={validationSchema}
      onSubmit={(values) => signUpRequest(values)}>
      {({ handleSubmit, values, setFieldValue, errors }) => (
        <View>
          <InputText
            value={values.name}
            label={'Nome'}
            placeholder={'Nome'}
            onChangeText={(text) => setFieldValue('name', text)}
          />
          {errors.name && <Text style={styles.error}>{errors.name}</Text>}
          <InputText
            value={values.lastName}
            label={'Sobrenome'}
            placeholder={'Sobrenome'}
            onChangeText={(text) => setFieldValue('lastName', text)}
          />
          {errors.lastName && (
            <Text style={styles.error}>{errors.lastName}</Text>
          )}
          <InputText
            value={values.email}
            label={'E-mail'}
            placeholder={'E-mail'}
            onChangeText={(text) => setFieldValue('email', text)}
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}
          <View style={{ marginHorizontal: 5 }}>
            <Text
              style={{
                color: '#fff',
                fontWeight: '600',
                fontSize: 16,
                marginBottom: 5,
              }}>
              Grau de Parentesco
            </Text>
            <RNPickerSelect
              onValueChange={(text) => setFieldValue('parent', text)}
              value={values.parent}
              items={[
                { label: 'Mãe', value: 'mae' },
                { label: 'Pai', value: 'pai' },
                { label: 'Tutor', value: 'tutor' },
              ]}
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
          <InputText
            value={values.phone}
            label={'Celular'}
            placeholder={'Celular'}
            onChangeText={(text) => setFieldValue('phone', text)}
          />
          {errors.phone && <Text style={styles.error}>{errors.phone}</Text>}

          <InputText
            value={values.password}
            label={'Senha'}
            placeholder={'Senha'}
            secureTextEntry={true}
            onChangeText={(text) => setFieldValue('password', text)}
          />
          {errors.password && (
            <Text style={styles.error}>{errors.password}</Text>
          )}

          <InputText
            value={values.passwordConfirm}
            label={'Confirmar Senha'}
            placeholder={'Confirmar Senha'}
            secureTextEntry={true}
            onChangeText={(text) => setFieldValue('passwordConfirm', text)}
          />
          {errors.passwordConfirm && (
            <Text style={styles.error}>{errors.passwordConfirm}</Text>
          )}
          <ButtonPrimary
            loading={status === 'loading'}
            onPress={handleSubmit}
            text="Enviar"
          />
        </View>
      )}
    </Formik>
  );
}

const mapStateToProps = ({ auth: { status } }) => ({
  status,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...AuthActions,
    },
    dispatch,
  );

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
