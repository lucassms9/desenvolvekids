import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { Creators as PlanActions } from '~/store/ducks/plan';
import { bindActionCreators } from 'redux';

import Header from '~/components/Header';

import { commons, colors } from '~/styles';

function MyOrders({ navigation, plan, auth }) {
  return (
    <View style={commons.body}>
      <Header title="Pedidos" hasBack />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ flex: 1, margin: 20 }} />
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

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);
