import { MaskService } from 'react-native-masked-text';

export const maskPhone = (setFieldValueCallback, field) => (text) => {
  const phone = MaskService.toMask('cel-phone', text, {
    maskType: 'BRL',
    withDDD: true,
    dddMask: '(99) ',
  });
  return setFieldValueCallback(field, phone);
};

export const maskOnlyPhone = (text) => {
  const phone = MaskService.toMask('cel-phone', text, {
    maskType: 'BRL',
    withDDD: true,
    dddMask: '(99) ',
  });
  return phone;
};
