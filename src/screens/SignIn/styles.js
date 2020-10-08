import { StyleSheet } from 'react-native';

import { metrics, colors } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerLogo: { flex: 2, alignItems: 'center' },
  content: {
    paddingLeft: 15,
  },
  containerForm: {
    flex: 5,
  },
  containerFooter: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
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
  containerSocial: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mp30: { marginTop: 30 },
});

export default styles;
