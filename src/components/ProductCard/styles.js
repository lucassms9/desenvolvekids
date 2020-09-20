import { StyleSheet } from 'react-native';

import { metrics, colors } from '~/styles';

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    height: 180,
    flex: 1,
    margin: 10,
    marginBottom: 15,
    borderRadius: 10,
  },
  itemEmpty: { backgroundColor: 'transparent' },
});

export default styles;
