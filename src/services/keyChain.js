import {  Alert } from 'react-native';
import * as Keychain from 'react-native-keychain';

const SERVICE_KEY_CHAIN = 'serviceKeyChain';

const isAvailable = async () => {
  const biometryType =  await Keychain.getSupportedBiometryType();
  if (biometryType === Keychain.BIOMETRY_TYPE.TOUCH_ID || biometryType === Keychain.BIOMETRY_TYPE.FINGERPRINT) {
    return true;
  }
 return false;
};


const dialogBiometric = async (username, password) => {
  const res = await isAvailable();
  console.log('isAvailable')
  console.log('res',res)
  if (!res) {
    return;
  }
  Alert.alert(
    'Você deseja usar o recurso de biometria para o próximo login?',
    'isso irá facilitar a forma de fazer login no app.',
    [
      {
        text: 'Não',
        onPress: async () => {
          await resetInternetKey();
        },
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          await setInternetKey(username, password);
        },
      },
    ],
    {
      cancelable: true,
      onDismiss: () => console.log('cancelable'),
    }
  );
};

const setInternetKey = async (username, password) => {
  const res = await isAvailable();
  if (!res) {
    return;
  }

  const result = await Keychain.setInternetCredentials(SERVICE_KEY_CHAIN,username,password,{
    accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY_OR_DEVICE_PASSCODE,
    accessible:Keychain.ACCESSIBLE.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY,
  });
  return result;
};

const hasInternetKey = async () => {
  const res = await isAvailable();
  if (!res) {
    return;
  }
  const result = await Keychain.hasInternetCredentials(SERVICE_KEY_CHAIN);
  return result;
};
const getInternetKey = async () => {
  const res = await isAvailable();
  if (!res) {
    return;
  }
  const result = await Keychain.getInternetCredentials(SERVICE_KEY_CHAIN);
  return result;
};

const resetInternetKey = async () => {
  const res = await isAvailable();
  if (!res) {
    return;
  }
  const result = await Keychain.resetInternetCredentials(SERVICE_KEY_CHAIN);
  return result;
};

export {
  isAvailable,
  dialogBiometric,
  setInternetKey,
  hasInternetKey,
  getInternetKey,
  resetInternetKey,
};
