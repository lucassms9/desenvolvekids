import { StyleSheet } from 'react-native';

import { metrics, colors } from '~/styles';

const styles = StyleSheet.create({
  items: {
    borderBottomWidth: 1,
    borderColor: '#fff',
    paddingVertical: 25,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '800',
    marginLeft: 5,
    marginTop: 2,
  },
});

export default styles;
