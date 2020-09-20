import React from 'react';
import PropTypes from 'prop-types';
import { View, SafeAreaView, Text } from 'react-native';

import ButtonPrimary from '../ButtonPrimary';

import styles from './styles';

const TryAgain = ({ tryAgain, message, buttonText }) => (
  <View style={styles.container}>
    <SafeAreaView>
      <Text style={styles.message}>
        {message || 'Erro no carregamento dos produtos'}
      </Text>
      <ButtonPrimary onPress={tryAgain} text={buttonText} />
    </SafeAreaView>
  </View>
);

TryAgain.defaultProps = {
  message: null,
  buttonText: 'Tentar novamente',
};

TryAgain.propTypes = {
  tryAgain: PropTypes.func.isRequired,
  message: PropTypes.string,
  buttonText: PropTypes.string,
};

export default TryAgain;
