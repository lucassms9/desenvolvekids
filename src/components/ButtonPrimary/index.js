import React from 'react';

import { Button } from 'react-native-elements';
import { colors } from '~/styles';
function ButtonPrimary({ loading, onPress, text }) {
  return (
    <Button
      title={text}
      loading={loading}
      onPress={onPress}
      buttonStyle={{ backgroundColor: colors.primary, height: 55 }}
    />
  );
}

export default ButtonPrimary;
