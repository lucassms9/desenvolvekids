import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
} from 'react-native';
import moment from 'moment';
import { connect } from 'react-redux';
import { Creators as PlanActions } from '~/store/ducks/plan';
import { bindActionCreators } from 'redux';

import Header from '~/components/Header';

import Loader from '~/components/Loader';
import Pagination from '~/components/Pagination';
import ItemsFilter from '~/components/ItemsFilter';
import NotFound from '~/components/NotFound';
import api from '~/services/api';

import { commons, colors } from '~/styles';
import styles from './styles';
import { maskMoney } from '~/helpers/index';

function MyOrders({ navigation, auth }) {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [filter, setFilter] = useState('');

  const moreOrders = async () => {
    if (page < totalPage) {
      setPage(page + 1);
    }

    const res = await getOrdersAsync(page + 1);
    const allTips = [...orders, ...res.pedidos];

    setOrders(allTips);
  };

  const getOrders = async () => {
    setLoading(true);
    const res = await getOrdersAsync();
    console.log(res);
    setOrders(res.pedidos);
    setTotalPage(res.total_pages);
    setLoading(false);
  };

  const getOrdersAsync = async (pageGet = 1) => {
    const res = await api.post('pedidos/list', {
      page: pageGet,
      busca: filter,
    });
    return res;
  };

  const filterOrders = async () => {
    getOrders();
  };

  useEffect(() => {
    getOrders();
  }, []);

  const openDetail = (order) => {
    navigation.navigate('OrderDetail', {
      order,
    });
  };

  return (
    <View style={commons.body}>
      <Header hasBack title="Pedidos" />
      <SafeAreaView>
        <View style={[commons.container, { paddingBottom: 70 }]}>
          {loading && <Loader />}
          {!loading && (
            <ScrollView>
              <View style={styles.fdr}>{/* filtrod ficam aqui */}</View>
              {orders && <NotFound type="pedido" />}
              {orders.map((order, index) => {
                console.log(order);
                return (
                  <TouchableOpacity onPress={() => openDetail(order)}>
                    <View
                      key={order.pedidos_id}
                      style={{
                        backgroundColor: '#fff',
                        height: 100,
                        flex: 1,
                        flexDirection: 'row',
                        marginBottom: 15,
                        borderRadius: 10,
                        padding: 10,
                      }}>
                      <View
                        style={{ flex: 1, justifyContent: 'space-between' }}>
                        <View>
                          <Text>Pedido: {order.pedidos_id}</Text>
                        </View>
                        <View>
                          <Text>Status: {order.status}</Text>
                        </View>
                      </View>

                      <View style={{ flex: 0.4, justifyContent: 'center' }}>
                        <View style={{ marginBottom: 10 }}>
                          <Text>{maskMoney(order.valor_final)}</Text>
                        </View>
                        <View>
                          <Text>{moment(order.data).format('DD/MM/YYYY')}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })}
              <Pagination
                totalPage={totalPage}
                page={page}
                getMoreItem={moreOrders}
              />
            </ScrollView>
          )}
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
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders);
