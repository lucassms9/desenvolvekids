import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View } from 'react-native';
import { useDispatch, connect } from 'react-redux';
import { Creators as PlanActions } from '~/store/ducks/plan';
import { Creators as AuthActions } from '~/store/ducks/auth';
import { bindActionCreators } from 'redux';
import { PricingCard } from 'react-native-elements';
import { ToastActionsCreators } from 'react-native-redux-toast';
import { StackActions } from '@react-navigation/native';

import { commons, colors } from '~/styles';
import Header from '~/components/Header';
import Loader from '~/components/Loader';
import api from '~/services/api';

import { maskMoney } from '~/helpers';

function Plans(props) {
  const { navigation, addPlan, signInSuccess } = props;
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const getPlans = async () => {
    setLoading(true);
    try {
      const res = await api.post('/planos');
      console.log(res)
      setPlans(res.planos);
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
  };

  const getPlanFree = async (planFree) => {
    try {
      const data = await api.post('/planos/free-assinar', {
        plano_id: planFree.id,
      });

      const {user} = await api.post('/user/get-data');
      console.log('data.user plan')
      console.log(user);
      signInSuccess(user);
      setTimeout(() => {
        return navigation.dispatch(StackActions.replace('Main'));
      },50)
      

    } catch (error) {
      dispatch(ToastActionsCreators.displayError(error.message));
    }
  };

  const payPlan = (plan) => {
    if (plan.valor > 0) {
      addPlan(plan);
      return navigation.navigate('PlanTerm');
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
                    containerStyle={{
                      borderRadius: 10,
                    }}
                    button={{ title: 'COMPRAR' }}
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

const mapStateToProps = ({ plan }) => ({
  plan,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...PlanActions,
      ...AuthActions,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Plans);
