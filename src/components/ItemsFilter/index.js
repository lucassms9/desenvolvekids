import React from 'react';
import { ScrollView, View, TouchableOpacity, Text, Image } from 'react-native';

import styles from './styles';
import { metrics, colors } from '~/styles';

function ItemsFilter({ items, filterFunc, active }) {
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
                <Text style={{textAlign:'center'}}>{item.label}</Text>
              </View>
            </TouchableOpacity>
          );
        }

        return (
          <TouchableOpacity key={item.id} onPress={() => filterFunc(item.id)}>
            <View style={[styles.container,{backgroundColor: item.id === active ? colors.yellow : colors.secondary}]}>
              <Text style={{ color: '#fff', fontSize: 15, fontWeight: 'bold' }}>
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
