import { StyleSheet } from 'react-native';

import { metrics, colors } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroung,
    flexDirection: 'column',
  },
  containerLogo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 25,
  },
  content: {
    paddingLeft: 15,
  },
  containerForm: {
    flex: 4,
  },
  containerFooter: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bodyLogin: {
    
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
