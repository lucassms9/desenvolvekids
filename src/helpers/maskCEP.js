import { MaskService } from 'react-native-masked-text';

export const maskCEP = (setFieldValueCallback, field) => (text) => {
  const cep = MaskService.toMask('custom', text, {
    mask: '99999-999',
  });

  return setFieldValueCallback(field, cep);
};

export const maskOnlyCEP = (text) => {
  const cep = MaskService.toMask('custom', text, {
    mask: '99999-999',
  });

  return cep
};

