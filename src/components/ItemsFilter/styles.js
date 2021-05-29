import { StyleSheet } from 'react-native';
import { metrics, colors } from '~/styles';

const styles = StyleSheet.create({
  container: {
    height: 30,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 4,
    marginRight: 5,
  },
  containerImage:{
    marginRight: 10,
    alignItems:'center',
    maxWidth:120,
    minWidth:90
  }
});

export default styles;
