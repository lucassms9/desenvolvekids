import React from 'react';

import { Button } from 'react-native-elements';
import colors from '~/styles/colors';

function ButtonSecondary({ loading, onPress, text }) {
  return (
    <Button
      title={text}
      loading={loading}
      onPress={onPress}
      buttonStyle={{ backgroundColor: colors.header, height: 55 }}
    />
  );
}

export default ButtonSecondary;
