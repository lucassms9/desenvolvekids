import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

import Loader from '../Loader';
import styles from './styes';

function Pagination({ totalPage, page, getMoreItem }) {
  const [loadingPaginate, setLoadingPaginate] = useState(false);

  const moreItems = async () => {
    setLoadingPaginate(true);
    await getMoreItem();
    setLoadingPaginate(false);
  };

  return (
    <View style={styles.container}>
      {loadingPaginate && <Loader />}
      {page < totalPage && (
        <TouchableOpacity onPress={moreItems}>
          <Text style={styles.item}>Ver mais</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default Pagination;
