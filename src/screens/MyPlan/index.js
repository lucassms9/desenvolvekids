import React, { useState, useRef, useMemo, useEffect } from 'react';

import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { Modal, ModalContent } from 'react-native-modals';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { connect, useDispatch } from 'react-redux';
import { Creators as PlanActions } from '~/store/ducks/plan';
import { Creators as AuthActions } from '~/store/ducks/auth';
import { bindActionCreators } from 'redux';
import { CommonActions } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import { PricingCard, Input } from 'react-native-elements';
import Header from '~/components/Header';
import NotFound from '~/components/NotFound';
import moment from 'moment';
import api from '~/services/api';
import { maskMoney } from '~/helpers';
import { colors, commons } from '~/styles';
import ButtonPrimary from '~/components/ButtonPrimary';
import { ToastActionsCreators } from 'react-native-redux-toast';

function MyPlan({ requestUserData, route, navigation, auth: { user } }) {
  const [plan, setPlan] = useState({});
  const [visible, setVisiable] = useState(false);
  const [cancelItem, setCancelItem] = useState('');
  const [objectiveOther, setObjectiveOther] = useState('');
  const [errors, setErros] = useState({});

  console.log(user);
  const dispatch = useDispatch();

  useEffect(() => {
    requestUserData('');
  }, []);

  const handleItem = useMemo(() => {
    if (cancelItem.toLowerCase() === 'outros') {
      return true;
    }
    return false;
  }, [cancelItem]);

  const cancelPlan = async (reason) => {
    try {
      if (!plan?.id) {
        return dispatch(
          ToastActionsCreators.displayError('Plano inválido', 5000),
        );
      }
      if (!cancelItem) {
        return dispatch(
          ToastActionsCreators.displayError(
            'Escolha um motivo para continuar',
            5000,
          ),
        );
      }

      if (cancelItem.toLowerCase() === 'outros' && !objectiveOther) {
        console.log('foi');
        return dispatch(
          ToastActionsCreators.displayError(
            'Especifique o motivo do cancelamento',
            5000,
          ),
        );
      }

      const result = await api.post('planos/cancel', {
        plan_id: plan.id,
        movito: cancelItem,
        outro_motivo: objectiveOther,
      });
      requestUserData('');
      setVisiable(false);
      dispatch(
        ToastActionsCreators.displayInfo(
          'Cancelamento realizado com sucesso.',
          5000,
        ),
      );
      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: 'Plans' }],
          }),
        );
        navigation.navigate('Plans');
      }, 500);
    } catch (error) {}
  };

  const footerPlan = (plan) => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 12,
          }}>
          <Text>Status: {plan.ativo == 1 ? 'Ativo' : 'Inativo'}</Text>
          <Text>
            Valido até: {moment(plan.data_final).format('DD/MM/YYYY')}
          </Text>
        </View>
        <View>
          <ButtonPrimary
            text="Cancelar Plano"
            onPress={() => {
              setPlan(plan);
              setVisiable(true);
              setCancelItem('');
              setErros({});
            }}
          />
        </View>
      </>
    );
  };
  return (
    <View style={commons.body}>
      <Header title="Meu Plano" hasBack />
      <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
        <View style={[commons.container, { flex: 1 }]}>
          <View style={{ padding: 15 }}>
            {user.plano.id ? (
              <PricingCard
                key={user.plano.id}
                color={colors.primary}
                title={user.plano.titulo}
                price={maskMoney(user.plano.valor)}
                info={[user.plano.subtitulo, user.plano.descricao]}
                button={footerPlan(user.plano)}
                containerStyle={{
                  borderRadius: 10,
                }}
                // onButtonPress={() => payPlan(plan)}
              />
            ) : (
              <NotFound type="plano" />
            )}
          </View>
        </View>
        <Modal
          width={300}
          visible={visible}
          swipeDirection={['up', 'down']} // can be string or an array
          swipeThreshold={200} // default 100
          onTouchOutside={() => {
            setVisiable(false);
          }}>
          <ModalContent>
            <View>
              <Text>Motivo:</Text>
              <RNPickerSelect
                onValueChange={(text) => {
                  setCancelItem(text);
                }}
                // value={cancelItem}
                items={[
                  {
                    label: 'Não uso o app com frequência',
                    value: 'Não uso o app com frequência',
                  },
                  {
                    label: 'Questões financeiras',
                    value: 'Questões financeiras',
                  },
                  {
                    label: 'Outros',
                    value: 'Outros',
                  },
                ]}
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
              {handleItem && (
                <>
                  <Input
                    value={objectiveOther}
                    label={'Detalhar Motivo:'}
                    placeholder={'Detalhar Motivo'}
                    onChangeText={(text) => setObjectiveOther(text)}
                  />
                  {errors.objectiveOther && (
                    <Text style={commons.error}>{errors.objectiveOther}</Text>
                  )}
                </>
              )}
              <ButtonPrimary
                text="Confirmar Cancelamento"
                onPress={cancelPlan}
              />
            </View>
          </ModalContent>
        </Modal>
      </SafeAreaView>
    </View>
  );
}

const mapStateToProps = ({ plan, auth }) => ({
  plan,
  auth,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...PlanActions,
      ...AuthActions,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(MyPlan);

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
