import React from 'react';

import {
  View,
  SafeAreaView,
  Platform,
  StyleSheet,
  Text,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Divider } from 'react-native-elements';

import Header from '~/components/Header';
import ButtonPrimary from '~/components/ButtonPrimary';

import TitleCard from '~/components/TitleCard';
import { PricingCard } from 'react-native-elements';
import { maskMoney } from '~/helpers';

import { commons, colors } from '~/styles';

function PlanConfirm({ route }) {
  const { plan } = route.params;

  const confirmPayment = () => {};

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
                <TitleCard />
              </View>
              <View style={{ flex: 1 }}>
                <Divider style={{ backgroundColor: '#fff' }} />
              </View>
            </View>
            <View style={{ margin: 15 }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  paddingBottom: 10,
                  marginHorizontal: 10,
                }}
              />
              <ButtonPrimary onPress={confirmPayment} text="CONCLUIR PEDIDO" />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

export default PlanConfirm;
