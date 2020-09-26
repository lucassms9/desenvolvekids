import { MaskService } from 'react-native-masked-text';

export const maskCPF = (setFieldValueCallback, field) => (text) => {
  const cpf = MaskService.toMask('cpf', text);

  return setFieldValueCallback(field, cpf);
};
