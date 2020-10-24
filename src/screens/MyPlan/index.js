import React, { useState, useRef } from 'react';

import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Creators as PlanActions } from '~/store/ducks/plan';
import { Creators as AuthActions } from '~/store/ducks/auth';
import { bindActionCreators } from 'redux';

import { PricingCard } from 'react-native-elements';
import Header from '~/components/Header';
import moment from 'moment';

import { maskMoney } from '~/helpers';
import { colors, commons } from '~/styles';

function MyPlan({ route, navigation, auth: { user } }) {
  console.log(user);
  const footerPlan = (plan) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 12,
        }}>
        <Text>Status: {plan.ativo == 1 ? 'Ativo' : 'Inativo'}</Text>
        <Text>Valido até: {moment(plan.data_final).format('DD/MM/YYYY')}</Text>
      </View>
    );
  };
  return (
    <View style={commons.body}>
      <Header title="Meu Plano" hasBack />
      <SafeAreaView style={{ flex: 1, flexDirection: 'column' }}>
        <View style={[commons.container, { flex: 1 }]}>
          <View style={{ padding: 15 }}>
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
          </View>
        </View>
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
