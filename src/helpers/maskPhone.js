import { MaskService } from 'react-native-masked-text';

export const maskPhone = (text) => {
  const phone = MaskService.toMask('cel-phone', text, {
    maskType: 'BRL',
    withDDD: true,
    dddMask: '(99) ',
  });
  return phone;
};
