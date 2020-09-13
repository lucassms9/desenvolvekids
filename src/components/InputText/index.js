import React from 'react';
import { commons } from '~/styles';

import { Input } from 'react-native-elements';

function InputText(props) {
  return (
    <Input
      inputStyle={commons.textWhite}
      labelStyle={commons.textWhite}
      {...props}
    />
  );
}

export default InputText;
