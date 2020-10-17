import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import Loader from '../Loader';

function Pagination({ totalPage, page, getMoreItem }) {
  const [loadingPaginate, setLoadingPaginate] = useState(false);

  const moreItems = async () => {
    setLoadingPaginate(true);
    await getMoreItem();
    setLoadingPaginate(false);
  };

  return (
    <View
      style={{
        paddingBottom: 50,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      {loadingPaginate && <Loader />}
      {page < totalPage && (
        <TouchableOpacity onPress={moreItems}>
          <Text
            style={{
              color: '#fff',
              fontSize: 17,
              fontWeight: '700',
            }}>
            Ver mais
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default Pagination;
