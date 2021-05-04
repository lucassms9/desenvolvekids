import { StyleSheet } from 'react-native';
import { metrics, colors } from '~/styles';

const styles = StyleSheet.create({
  container: {
    height: 30,
    backgroundColor: colors.secondary,
    justifyContent: 'center',
    paddingHorizontal: 10,
    borderRadius: 15,
    marginRight: 5,
  },
  containerImage:{
    height: 80,
    marginRight: 10,
    alignItems:'center'
  }
});

export default styles;
