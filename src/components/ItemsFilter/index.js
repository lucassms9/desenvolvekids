import React from 'react';
import { ScrollView, View, TouchableOpacity, Text, Image } from 'react-native';

import styles from './styles';

function ItemsFilter({ items, filterFunc }) {
  return (
    <ScrollView horizontal >
      {items.map((item) => {
        console.log(item);
        if (item?.icon) {
          return (
            <TouchableOpacity key={item.id} onPress={() => filterFunc(item.id)}>
              <View style={styles.containerImage}>
                <Image
                  style={{ width: 65, height: 65 }}
                  resizeMode="contain"
                  source={{ uri: item.icon }}
                />
                <Text>{item.label}</Text>
              </View>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity key={item.id} onPress={() => filterFunc(item.id)}>
            <View style={styles.container}>
              <Text style={{ color: '#000', fontSize: 15, fontWeight: 'bold' }}>
                {item.label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

export default ItemsFilter;
