import { StyleSheet } from 'react-native';

import { metrics, colors } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bodyLogin: {
    flex: 1,
    backgroundColor: colors.backgroung,
    flexDirection: 'column',
  },
  containerLogin: {
    flex: 1,
    margin: 20,
    backgroundColor: colors.backgroung,
  },
  error: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 10,
    top: -15,
  },
  pickerItem: {
    color: colors.gray,
  },
});

export default styles;
