import React from 'react';

import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { colors } from '~/styles';
function ButtonPrimary({ loading, onPress, text, icon, buttonStyle }) {
  return (
    <Button
      title={text}
      icon={icon}
      loading={loading}
      onPress={onPress}
      titleStyle={{
        fontSize:16
      }}
      buttonStyle={buttonStyle ? buttonStyle  : {
        backgroundColor: colors.primary,
        height: 55,
        borderRadius: 10,
      }}
    />
  );
}

export default ButtonPrimary;
