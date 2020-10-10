import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Creators as AuthActions } from '~/store/ducks/auth';

import { SafeAreaView, ScrollView, View, Text } from 'react-native';
import { Image, Button, Icon } from 'react-native-elements';

import Header from '~/components/Header';
import { commons } from '~/styles';
import ButtonPrimary from '~/components/ButtonPrimary';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styles from './styles';

function Options({ signOutRequest, navigation }) {
  const openProfile = () => {
    navigation.navigate('Profile');
  };
  const openMyPlan = () => {
    navigation.navigate('MyPlan');
  };
  const openMyOrder = () => {
    navigation.navigate('MyOrders');
  };
  const openDelivery = () => {
    navigation.navigate('DeliveryInfo', { origem: 'options' });
  };
  const openChildrens = () => {
    navigation.navigate('Childrens');
  };
  return (
    <View style={commons.body}>
      <Header title="Opções" hasBack />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[commons.container, { flex: 1 }]}>
          <View style={{ flex: 1 }}>
            <TouchableOpacity onPress={openProfile} style={styles.items}>
              <Text style={styles.itemLabel}>Meus Dados</Text>
              <Icon color="#fff" name="arrow-right" type="feather" />
            </TouchableOpacity>
            <TouchableOpacity onPress={openChildrens} style={styles.items}>
              <Text style={styles.itemLabel}>Meus Filhos</Text>
              <Icon color="#fff" name="arrow-right" type="feather" />
            </TouchableOpacity>
            <TouchableOpacity onPress={openDelivery} style={styles.items}>
              <Text style={styles.itemLabel}>Meus Endereços</Text>
              <Icon color="#fff" name="arrow-right" type="feather" />
            </TouchableOpacity>
            <TouchableOpacity onPress={openMyPlan} style={styles.items}>
              <Text style={styles.itemLabel}>Meu Plano</Text>
              <Icon color="#fff" name="arrow-right" type="feather" />
            </TouchableOpacity>
            <TouchableOpacity onPress={openMyOrder} style={styles.items}>
              <Text style={styles.itemLabel}>Meus Pedidos</Text>
              <Icon color="#fff" name="arrow-right" type="feather" />
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: 15 }}>
            <ButtonPrimary text="FAZER LOGOUT" onPress={signOutRequest} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const mapStateToProps = ({ auth: { user, loading } }) => ({
  userEntity: user,
  loading,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...AuthActions,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Options);
