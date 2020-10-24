import { StyleSheet } from 'react-native';

import { metrics, colors } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  containerPlus: { paddingBottom: 70, flexDirection: 'column' },
  cartTxt: { color: '#fff', fontSize: 19 },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    marginHorizontal: 10,
  },
});

export default styles;
