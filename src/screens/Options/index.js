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

function Options({
  signOutRequest,
  navigation,
  setNavigation,
  route,
  requestUserData,
  userEntity: user,
}) {
  const [hasPlan, setHasPlan] = useState(false);

  useEffect(() => {
    if (user && user.plano && user.plano.id) {
      setHasPlan(true);
    } else {
      setHasPlan(false);
    }
  }, []);

  const openProfile = () => {
    navigation.navigate('Profile');
  };
  const openMyPlan = () => {
    navigation.navigate('MyPlan');
  };
  const openProgresso = () => {
    navigation.navigate('Progress');
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
    navigation.navigate('Main', {
      screen: 'Forum',
      params: { showBack: true },
    });
  };
  const openHelp = () => {
    navigation.navigate('Contact');
  };
  useEffect(() => {
    setNavigation({ ...navigation, ...route });
    requestUserData('');
  }, []);

  return (
    <View style={commons.body}>
      <SafeAreaView style={{ flex: 1 }}>
        <Header title="Opções" hasBack />
        <View style={[commons.container, { flex: 1 }]}>
          <ScrollView style={{ flex: 1 }}>
            <TouchableOpacity onPress={openProfile} style={styles.items}>
              <View style={{ flexDirection: 'row' }}>
                <Icon color="#000" name="user" type="feather" />
                <Text style={styles.itemLabel}>Meus Dados</Text>
              </View>
              <Icon color="#000" name="arrow-right" type="feather" />
            </TouchableOpacity>
            {hasPlan && (
              <>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Dependent')}
                  style={styles.items}>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon color="#000" name="users" type="feather" />
                    <Text style={styles.itemLabel}>Dependentes</Text>
                  </View>
                  <Icon color="#000" name="arrow-right" type="feather" />
                </TouchableOpacity>
                <TouchableOpacity onPress={openForum} style={styles.items}>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon
                      color="#000"
                      name="forum-outline"
                      type="material-community"
                    />
                    <Text style={styles.itemLabel}>Pergunte ao Doutor</Text>
                  </View>
                  <Icon color="#000" name="arrow-right" type="feather" />
                </TouchableOpacity>
                <TouchableOpacity onPress={openChildrens} style={styles.items}>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon color="#000" name="child" type="font-awesome" />
                    <Text style={styles.itemLabel}>Crianças</Text>
                  </View>
                  <Icon color="#000" name="arrow-right" type="feather" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Gallery')}
                  style={styles.items}>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon color="#000" name="photo" type="font-awesome" />
                    <Text style={styles.itemLabel}>Galeria de Fotos</Text>
                  </View>

                  <Icon color="#000" name="arrow-right" type="feather" />
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={openDelivery} style={styles.items}>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon color="#000" name="map-pin" type="feather" />
                    <Text style={styles.itemLabel}>Meus Endereços</Text>
                  </View>

                  <Icon color="#000" name="arrow-right" type="feather" />
                </TouchableOpacity> */}
                <TouchableOpacity onPress={openMyPlan} style={styles.items}>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon color="#000" name="clipboard" type="feather" />
                    <Text style={styles.itemLabel}>Gerenciar Assinatura</Text>
                  </View>
                  <Icon color="#000" name="arrow-right" type="feather" />
                </TouchableOpacity>

                <TouchableOpacity onPress={openProgresso} style={styles.items}>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon color="#000" name="activity" type="feather" />
                    <Text style={styles.itemLabel}>Progresso</Text>
                  </View>
                  <Icon color="#000" name="arrow-right" type="feather" />
                </TouchableOpacity>

                {/* <TouchableOpacity onPress={openMyOrder} style={styles.items}>
                  <View style={{ flexDirection: 'row' }}>
                    <Icon color="#000" name="shopping-bag" type="feather" />
                    <Text style={styles.itemLabel}>Meus Pedidos</Text>
                  </View>
                  <Icon color="#000" name="arrow-right" type="feather" />
                </TouchableOpacity> */}
              </>
            )}
            <TouchableOpacity onPress={openHelp} style={styles.items}>
              <View style={{ flexDirection: 'row' }}>
                <Icon color="#000" name="help-circle" type="feather" />
                <Text style={styles.itemLabel}>Fale Consoco</Text>
              </View>
              <Icon color="#000" name="arrow-right" type="feather" />
            </TouchableOpacity>
          </ScrollView>
          <View style={{ marginTop: 15, backgroundColor: '#f00' }}>
            <ButtonPrimary
              icon={
                <Icon
                  style={{ marginLeft: 5, marginTop: 3 }}
                  color="#000"
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
