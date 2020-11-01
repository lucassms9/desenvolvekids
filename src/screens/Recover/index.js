import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

function Recover() {
  const [res, setRes] = useState('');
  const getDatas = async () => {
    try {
      const res = await axios.get(
        'http://homolog.desenvolvekids.com.br/api/forums/categories-list',
      );

      setRes(JSON.stringify(res));
    } catch (error) {
      const res = await axios.get(
        'http://homolog.desenvolvekids.com.br/api/forums/categories-list',
      );

      setRes(JSON.stringify(error));
    }
  };

  useEffect(() => {
    getDatas();
  });

  return (
    <View>
      <Text>{res}</Text>
    </View>
  );
}

export default Recover;
