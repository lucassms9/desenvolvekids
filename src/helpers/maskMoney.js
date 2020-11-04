import { Platform } from 'react-native';

export function maskMoney(value) {
  var money;
  if (Platform.OS === 'android') {
    // only android needs polyfill
    require('intl'); // import intl object
    require('intl/locale-data/jsonp/pt-BR'); // load the required locale details

    money = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(Number(value));
    return money;
  }

  money = Number(value).toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });

  return money;
}
