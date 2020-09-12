import React from 'react';

import { Button } from 'react-native-elements';
import { colors } from '~/styles';
function ButtonPrimary({ loading, action, text }) {
  return (
    <Button
      title={text}
      loading={loading}
      onPress={action}
      buttonStyle={{ backgroundColor: colors.primary, height: 55 }}
    />
  );
}

export default ButtonPrimary;
