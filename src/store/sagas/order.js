import { call, put, select } from 'redux-saga/effects';
import AsyncStorage from '@react-native-community/async-storage';
import { StackActions } from '@react-navigation/native';
import { ToastActionsCreators } from 'react-native-redux-toast';
import api from '../../services/api';

import { Creators as OrderActions } from '../ducks/order';

export function* requestPaymentOrder({
  products,
  enderecoId,
  entregaId,
  valor_frete,
  forma_pagmento,
  promocode,
}) {
  try {
    console.log(products);
    const response = yield call(api.post, 'pedidos/pagamento', {
      products,
      enderecoId,
      entregaId,
      valor_frete,
      forma_pagmento,
      promocode,
    });
    console.log(response);

    const {
      auth: { navigationGlobal },
    } = yield select();

    yield call([navigationGlobal, 'dispatch'], StackActions.replace('Store'));
    yield put(OrderActions.requestPaymentOrderResult(response));
    yield put(ToastActionsCreators.displayInfo('Pedido realizado com sucesso'));
  } catch (error) {
    console.log(error);
    yield put(ToastActionsCreators.displayError(error.message));
    yield put(OrderActions.requestPaymentOrderResult(error));
  }
}
export function* fetchDeliveryway({ deliveryMethod, products }) {
  try {
    console.log(deliveryMethod.cep);
    console.log(products);

    const handleProducts = products.map((p) => ({
      produtos_id: p.id,
      quantidade: p.count,
    }));

    const response = yield call(api.post, 'pedidos/calc-frete', {
      products: handleProducts,
      zipCode: deliveryMethod.cep,
    });

    yield put(OrderActions.fetchDeliveryWayResult(response.forma_entrega));
  } catch (error) {
    yield put(ToastActionsCreators.displayError(error.message));
    yield put(OrderActions.fetchDeliveryWayError(error));
  }
}
