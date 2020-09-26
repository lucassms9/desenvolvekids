import { MaskService } from 'react-native-masked-text';

export const maskDate = (setFieldValueCallback, field) => (text) => {
  const date = MaskService.toMask('datetime', text, {
    format: 'YYYY/MM/DD',
  });

  return setFieldValueCallback(field, date);
};
