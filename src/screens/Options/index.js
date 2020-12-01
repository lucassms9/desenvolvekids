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

function Options({ signOutRequest, navigation, setNavigation, route }) {
  console.log(signOutRequest);
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
  const openForum = () => {
    navigation.navigate('Forum');
  };
  useEffect(() => {
    setNavigation({ ...navigation, ...route });
  }, []);

  return (
    <View style={commons.body}>
      <Header title="Opções" hasBack />
      <SafeAreaView style={{ flex: 1 }}>
        <View style={[commons.container, { flex: 1 }]}>
          <ScrollView style={{ flex: 1 }}>
            <TouchableOpacity onPress={openProfile} style={styles.items}>
              <View style={{ flexDirection: 'row' }}>
                <Icon color="#fff" name="user" type="feather" />
                <Text style={styles.itemLabel}>Meus Dados</Text>
              </View>
              <Icon color="#fff" name="arrow-right" type="feather" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Dependent')}
              style={styles.items}>
              <View style={{ flexDirection: 'row' }}>
                <Icon color="#fff" name="users" type="feather" />
                <Text style={styles.itemLabel}>Dependentes</Text>
              </View>
              <Icon color="#fff" name="arrow-right" type="feather" />
            </TouchableOpacity>
            <TouchableOpacity onPress={openForum} style={styles.items}>
              <View style={{ flexDirection: 'row' }}>
                <Icon
                  color="#fff"
                  name="forum-outline"
                  type="material-community"
                />
                <Text style={styles.itemLabel}>Pergunte ao Doutor</Text>
              </View>
              <Icon color="#fff" name="arrow-right" type="feather" />
            </TouchableOpacity>
            <TouchableOpacity onPress={openChildrens} style={styles.items}>
              <View style={{ flexDirection: 'row' }}>
                <Icon color="#fff" name="child" type="font-awesome" />
                <Text style={styles.itemLabel}>Meus Filhos</Text>
              </View>
              <Icon color="#fff" name="arrow-right" type="feather" />
            </TouchableOpacity>
            <TouchableOpacity onPress={openDelivery} style={styles.items}>
              <View style={{ flexDirection: 'row' }}>
                <Icon color="#fff" name="map-pin" type="feather" />
                <Text style={styles.itemLabel}>Meus Endereços</Text>
              </View>

              <Icon color="#fff" name="arrow-right" type="feather" />
            </TouchableOpacity>
            <TouchableOpacity onPress={openMyPlan} style={styles.items}>
              <View style={{ flexDirection: 'row' }}>
                <Icon color="#fff" name="clipboard" type="feather" />
                <Text style={styles.itemLabel}>Meu Plano</Text>
              </View>
              <Icon color="#fff" name="arrow-right" type="feather" />
            </TouchableOpacity>
            <TouchableOpacity onPress={openMyOrder} style={styles.items}>
              <View style={{ flexDirection: 'row' }}>
                <Icon color="#fff" name="shopping-bag" type="feather" />
                <Text style={styles.itemLabel}>Meus Pedidos</Text>
              </View>
              <Icon color="#fff" name="arrow-right" type="feather" />
            </TouchableOpacity>
          </ScrollView>
          <View style={{ marginTop: 15, backgroundColor: '#f00' }}>
            <ButtonPrimary
              icon={
                <Icon
                  style={{ marginLeft: 5, marginTop: 3 }}
                  color="#fff"
                  size={18}
                  name="log-out"
                  type="feather"
                />
              }
              text="FAZER LOGOUT"
              onPress={signOutRequest}
            />
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
