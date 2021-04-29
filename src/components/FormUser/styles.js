import { StyleSheet } from 'react-native';

import { metrics, colors } from '~/styles';

const styles = StyleSheet.create({
  error: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 10,
    top: -15,
  },
  mh5: { marginHorizontal: 5 },
  labelPicker: {
    color: colors.darkGray,
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 5,
  },
});

export default styles;
