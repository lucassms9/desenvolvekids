import ImagePicker from 'react-native-image-picker ';

export default function cameraService() {
  const options = {
    mediaType: 'photo',
    includeBase64: true,
    quality: 1,
  };

  return new Promise((resolve, reject) => {
    ImagePicker.launchCamera(options, (response) => {
      if (response.didCancel) {
        reject('User cancelled image picker');
      } else if (response.error) {
        reject(`ImagePicker Error: ${response.error}`);
      } else if (response.camera) {
        reject(`User tapped custom button: ${response.camera}`);
      } else {
        resolve(response);
      }
    });
  });
}
