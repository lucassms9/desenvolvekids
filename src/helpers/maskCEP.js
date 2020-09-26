import { MaskService } from 'react-native-masked-text';

export const maskCEP = (setFieldValueCallback, field) => (text) => {
  console.log(text);
  const cep = MaskService.toMask('custom', text, {
    mask: '99999-999',
  });

  return setFieldValueCallback(field, cep);
};
