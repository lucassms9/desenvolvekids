import { MaskService } from 'react-native-masked-text';

export const maskDate = (setFieldValueCallback, field) => (text) => {
  const date = MaskService.toMask('datetime', text, {
    format: 'DD/MM/YYYY',
  });

  return setFieldValueCallback(field, date);
};
