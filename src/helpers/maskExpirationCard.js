import { MaskService } from 'react-native-masked-text';

export const maskExpirationCard = (setFieldValueCallback, field) => (text) => {
  const date = MaskService.toMask('datetime', text, {
    format: 'MM/YYYY',
  });

  return setFieldValueCallback(field, date);
};
