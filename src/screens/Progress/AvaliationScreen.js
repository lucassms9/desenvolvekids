import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import { colors } from '~/styles';

const AvaliationScreen = () => {
  const navigation = useNavigation();

  const handleItem = () => {
    navigation.navigate('AvaliationQuestions')
  };

  return (
    <ScrollView >
      <View style={{ marginTop: 15,flex:1 }}>
        <View>
          <Text style={{ color: colors.white, fontSize: 20 }}>Area Fisica</Text>
        </View>
        <ScrollView
          style={{
            marginTop: 15,
            padding: 10,
          }}>
          <TouchableOpacity onPress={handleItem}>
          <View
            style={{justifyContent: 'space-between', alignContent: 'center',backgroundColor: '#f00',flexDirection:'row', marginBottom:20, padding:10 }}>
              <Text style={{ color: colors.white, fontSize:18 }}>Gestos</Text>
              <Icon name="chevron-right" type="feather" color={colors.white} />  
          </View>
          </TouchableOpacity>
         
          <View
            style={{ justifyContent: 'space-between', alignContent: 'center',backgroundColor: '#f00',flexDirection:'row',padding:10, marginBottom:20, }}>
              <Text style={{ color: colors.white,fontSize:18 }}>Gestos</Text>
              <Icon name="chevron-right" type="feather" color={colors.white} />  
          </View>

        </ScrollView>
      </View>
    </ScrollView>
  );
};

export default AvaliationScreen;
