import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, View } from 'react-native';

import { colors } from '~/styles';
import styles from './styles';

const Loader = ({ color }) => {
  console.log(color);
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.secondary} />
    </View>
  );
};
Loader.defaultProps = {
  color: colors.secondary,
};

Loader.propTypes = {
  color: PropTypes.string,
};

export default Loader;
