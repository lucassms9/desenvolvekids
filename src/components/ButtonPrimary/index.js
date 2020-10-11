import React from 'react';

import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { colors } from '~/styles';
function ButtonPrimary({ loading, onPress, text, icon }) {
  return (
    <Button
      title={text}
      icon={icon}
      loading={loading}
      onPress={onPress}
      buttonStyle={{ backgroundColor: colors.primary, height: 55 }}
    />
  );
}

export default ButtonPrimary;
