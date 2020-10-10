import { MaskService } from 'react-native-masked-text';

export const maskCPF = (setFieldValueCallback, field) => (text) => {
  const cnpj = MaskService.toMask('cpf', text);

  return setFieldValueCallback(field, cnpj);
};

export const maskOnlyCPF = (text) => {
  const cnpj = MaskService.toMask('cpf', text);

  return cnpj;
};
