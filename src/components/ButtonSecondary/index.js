import React from 'react';

import { Button } from 'react-native-elements';
import colors from '~/styles/colors';

function ButtonSecondary({ loading, onPress, text, icon }) {
  return (
    <Button
      title={text}
      icon={icon}
      loading={loading}
      onPress={onPress}
      buttonStyle={{
        backgroundColor: colors.header,
        height: 55,
        borderRadius: 10,
      }}
    />
  );
}

export default ButtonSecondary;
