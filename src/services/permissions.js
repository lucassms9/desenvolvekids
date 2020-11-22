import { Platform, PermissionsAndroid } from 'react-native';

export async function permissionLocation() {
  let granted = true;
  if (Platform.OS === 'android') {
    granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
  }
  if (!granted) {
    granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Precisamos de acesso a sua localização',
        message:
          'A localização é necessária para o envio das comprovações e garantia de qualidade dos nossos serviços.',
      },
    );
  }
  return granted;
}

export async function permissionCamera() {
  let granted = true;
  if (Platform.OS === 'android') {
    granted = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.CAMERA,
    );
  }
  if (!granted) {
    granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: 'Precisamos de acesso a camera',
        message:
          'A camera é necessaria para o usuário enviar fotos relacionado as atividades concluídas no app.',
      },
    );
  }
  return granted;
}
