import React from 'react';
import { ScrollView, View, TouchableOpacity, Text } from 'react-native';

import styles from './styles';

function ItemsFilter({ items, filterFunc }) {
  return (
    <ScrollView horizontal>
      {items.map((item) => {
        return (
          <TouchableOpacity key={item.id} onPress={() => filterFunc(item.id)}>
            <View style={styles.container}>
              <Text style={{ color: '#fff', fontSize:15, fontWeight:'bold' }}>{item.label}</Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

export default ItemsFilter;
