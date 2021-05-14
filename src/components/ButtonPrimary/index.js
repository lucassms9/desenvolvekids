import React from 'react';

import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { colors } from '~/styles';
function ButtonPrimary({ loading, onPress, text, icon, buttonStyle }) {
  const styleText = icon ? {
    fontSize:16,
    marginLeft:10
  } : { fontSize:16, paddingBottom: 2,};
  return (
    <Button
      title={text}
      icon={icon}
      loading={loading}
      onPress={onPress}
      titleStyle={styleText}
      buttonStyle={buttonStyle ? buttonStyle  : {
        backgroundColor: colors.primary,
        height: 55,
        borderRadius: 10,
       
      }}
      iconContainerStyle={{
        paddingRight:10
      }}
    />
  );
}

export default ButtonPrimary;
