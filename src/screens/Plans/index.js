import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { PricingCard } from 'react-native-elements';
import { ToastActionsCreators } from 'react-native-redux-toast';
import { StackActions } from '@react-navigation/native';

import { commons, colors } from '~/styles';
import Header from '~/components/Header';
import Loader from '~/components/Loader';
import api from '~/services/api';

import { maskMoney } from '~/helpers';

function Plans({ navigation }) {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const getPlans = async () => {
    setLoading(true);
    try {
      const res = await api.get('/planos');

      setPlans(res.planos.reverse());
      console.log(res);
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };

  const getPlanFree = async (planFree) => {
    try {
      const data = await api.post('planos/free-assinar', {
        plano_id: planFree.id,
      });
      return navigation.dispatch(StackActions.replace('Main'));
    } catch (error) {
      dispatch(ToastActionsCreators.displayError(error.message));
    }
  };

  const payPlan = (plan) => {
    if (plan.valor > 0) {
      return navigation.navigate('PaymentMethod', { origem: 'plans', plan });
    }
    getPlanFree(plan);
  };

  useEffect(() => {
    getPlans();
  }, []);

  return (
    <View style={commons.body}>
      <Header title="Planos" />
      <SafeAreaView>
        <View style={[commons.container, { paddingBottom: 70 }]}>
          {loading && <Loader />}
          {!loading && (
            <ScrollView>
              {plans.map((plan, index) => {
                return (
                  <PricingCard
                    key={plan.id}
                    color={colors.primary}
                    title={plan.titulo}
                    price={maskMoney(plan.valor)}
                    info={[plan.subtitulo, plan.descricao]}
                    button={{ title: 'COMPRAR', icon: 'flight-takeoff' }}
                    onButtonPress={() => payPlan(plan)}
                  />
                );
              })}
            </ScrollView>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

export default Plans;
