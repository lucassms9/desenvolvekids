import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';

import {
  Modal,
  View,
  SafeAreaView,
  Text,
  TouchableHighlight,
  Platform,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';

import styles from './styles';
import { colors } from '~/styles';
import api from '~/services/api';

const androidCameraPermissionOptions = {
  title: 'Permissão para usar a câmera',
  message: 'Precisamos de sua permissão para usar sua câmera',
  buttonPositive: 'Ok',
  buttonNegative: 'Cancelar',
};
class CameraModal extends Component {
  state = {
    photo: null,
    loading: false,
    longitude: 0.0,
    latitude: 0.0,
  };

  componentDidMount() {
   
  }

  takePicture = async () => {
    if (this.camera) {
      this.setState({ loading: true });

      const options = {
        quality: 0.5,
        forceUpOrientation: true,
        fixOrientation: true,
        base64: true,
        width: 1200
      };

      try {
        const data = await this.camera.takePictureAsync(options);
        this.setState({ photo: data, loading: false });
      } catch (err) {
        this.setState({ loading: false });   
        Alert.alert(
          'Erro!',
          'Ocorreu um erro ao tirar a foto. Por favor, feche o aplicativo e tente novamente.',
        );
      }
    }
  }

  retakePhoto = () => {
    this.setState({ photo: null });
  }

  savePhoto = async () => {
    const { photo: { base64 } } = this.state;
    const { handleCloseModal, handleSavePhoto } = this.props;

    this.setState({ photo: null, loading: false });
    handleCloseModal();
    handleSavePhoto(base64);
  }

  render() {
    const { photo, loading } = this.state;
    const { visible, handleCloseModal } = this.props;

    return (
      <Modal
        visible={visible}
        transparent={false}
        animationType="slide"
        onRequestClose={handleCloseModal}
      >
        {photo && (
          <View style={styles.photoContainer}>
            <Image source={{ uri: photo.uri }} style={{ flex: 1, resizeMode: 'contain' }} />
            <View style={styles.photoOptions}>
              {loading
                ? (
                  <View style={styles.sendingPhotoLoading}>
                    <ActivityIndicator size="large" color={colors.white} />
                  </View>
                )
                : (
                  <>
                    <TouchableOpacity onPress={this.retakePhoto} style={styles.photoOption}>
                      <Icon
                        name={Platform.OS === 'ios' ? 'ios-refresh' : 'md-refresh'}
                        size={30}
                        color={colors.darkGray}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.savePhoto} style={styles.photoOption}>
                      <Icon
                        name="md-checkmark"
                        size={30}
                        color={colors.success}
                      />
                    </TouchableOpacity>
                  </>
                )}
            </View>
          </View>
        )}

        {!photo && (
          <View style={styles.container}>
            <View style={styles.header}>
              <SafeAreaView style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButtonContainer} onPress={handleCloseModal}>
                  <Icon
                    name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
                    size={28}
                    color={colors.darkGray}
                  />
                  <Text style={styles.goBack}>Voltar</Text>
                </TouchableOpacity>

              </SafeAreaView>
            </View>

            <RNCamera
              ref={(camera) => { this.camera = camera; }}
              style={styles.camera}
              type={RNCamera.Constants.Type.back}
              autoFocus={RNCamera.Constants.AutoFocus.on}
              flashMode={RNCamera.Constants.FlashMode.off}
              captureAudio={false}
              androidCameraPermissionOptions={androidCameraPermissionOptions}
            />

            {loading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={{ marginTop: 10, color: colors.darkGray }}>Processando</Text>
              </View>
            )}

            <View style={styles.footer}>
              <SafeAreaView>
                <View style={styles.buttonContainer}>
                  <TouchableHighlight style={styles.button} onPress={this.takePicture}>
                    <View style={styles.buttonLabel} />
                  </TouchableHighlight>
                </View>
              </SafeAreaView>
            </View>
          </View>
        )}
      </Modal>
    );
  }
}

CameraModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleCloseModal: PropTypes.func.isRequired,
  activationId: PropTypes.string.isRequired,
  parentId: PropTypes.number,
  navigation: PropTypes.shape().isRequired,
};

export default CameraModal;
