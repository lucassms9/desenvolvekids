import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { Creators as PlanActions } from '~/store/ducks/plan';
import { bindActionCreators } from 'redux';

import Header from '~/components/Header';
import ButtonPrimary from '~/components/ButtonPrimary';
import { commons, colors } from '~/styles';

function PlanTerm({ navigation, plan, auth }) {
  const goPayment = () => {
    // if (auth.user.enderecos.length > 0) {
      return navigation.navigate('PaymentMethod', { origem: 'plans' });
    // } else {
    //   return navigation.navigate('DeliveryInfo', { origem: 'plans' });
    // }
  };

  return (
    <View style={commons.body}>
      <Header title="Termo de Uso" hasBack />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, margin: 20 }}>
            <View>
              <Text style={{ color: '#fff', fontSize: 15, fontWeight: '600' }}>
                {plan.plan.termo_de_uso}
              </Text>
            </View>
            <View style={{ marginTop: 20 }}>
              <ButtonPrimary onPress={goPayment} text="ACEITAR TERMOS" />
            </View>
          </View>
        </ScrollView>
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
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(PlanTerm);
