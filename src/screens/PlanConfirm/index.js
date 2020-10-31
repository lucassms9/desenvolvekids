import React, { useEffect, useState } from 'react';

import {
  View,
  SafeAreaView,
  Platform,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { Creators as PlanActions } from '~/store/ducks/plan';
import { bindActionCreators } from 'redux';
import generateCardHash from 'react-native-pagarme-card-hash';
import { ENCRYPTION_KEY } from '~/config/constantes';
import { Divider } from 'react-native-elements';
import RNPickerSelect from 'react-native-picker-select';

import Header from '~/components/Header';
import ButtonPrimary from '~/components/ButtonPrimary';

import TitleCard from '~/components/TitleCard';
import { PricingCard } from 'react-native-elements';
import { maskMoney } from '~/helpers';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { commons, colors } from '~/styles';

function PlanConfirm({ plan: planState, requestPaymentPlan }) {
  const { plan, methodPayment, status } = planState;
  const [installment, setInstallment] = useState(null);
  const [installments, setInstallments] = useState([{ label: '', value: '' }]);

  useEffect(() => {
    const install = plan.parcelas.map((ins) => ({
      label: `${maskMoney(ins.valor)} - ${ins.qtd}x`,
      value: String(ins.qtd),
    }));
    setInstallments(install);
  }, [plan]);

  const confirmPayment = async () => {
    const hash = await generateCardHash(
      {
        number: methodPayment.cardNumber,
        holderName: methodPayment.cardName,
        expirationDate: methodPayment.cardValid,
        cvv: methodPayment.cardCode,
      },
      ENCRYPTION_KEY,
    );
    console.log(hash);
    requestPaymentPlan(plan, methodPayment, hash, installment);
  };

  return (
    <View style={commons.body}>
      <Header title="Finalizar Compra" hasBack />
      <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
        <ScrollView>
          <View style={[commons.container, { flex: 1 }]}>
            <View style={{ padding: 15 }}>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>
                Plano Selecionado
              </Text>

              <PricingCard
                color={colors.primary}
                title={plan.titulo}
                price={maskMoney(plan.valor)}
                containerStyle={{
                  borderRadius: 10,
                }}
                info={[plan.subtitulo, plan.descricao]}
                button={<View />}
              />

              <View style={{ flex: 1 }}>
                <Divider style={{ backgroundColor: '#fff' }} />
              </View>
            </View>

            <View style={{ padding: 15 }}>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700' }}>
                Forma de Pagamento
              </Text>
              <View>
                <TitleCard
                  styles={{ marginVertical: 10 }}
                  cardValid={methodPayment.cardValid}
                  cardName={methodPayment.cardName}
                  cardNumber={methodPayment.cardNumber}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Divider style={{ backgroundColor: '#fff' }} />
              </View>
            </View>
            {plan.parcelas.length > 0 && (
              <View style={{ padding: 15 }}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 18,
                    fontWeight: '700',
                    marginBottom: 15,
                  }}>
                  Parcelas
                </Text>
                <RNPickerSelect
                  onValueChange={(text) => setInstallment(text)}
                  value={installment}
                  items={installments}
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
              </View>
            )}

            <View style={{ margin: 15 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  paddingBottom: 10,
                  marginHorizontal: 10,
                }}
              />
              <ButtonPrimary
                loading={status === 'loading'}
                onPress={confirmPayment}
                text="CONCLUIR PEDIDO"
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

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
    borderColor: 'purple',
    borderRadius: 8,
    color: '#fff',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

const mapStateToProps = ({ plan }) => ({
  plan,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...PlanActions,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(PlanConfirm);
