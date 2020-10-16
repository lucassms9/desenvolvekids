import { StyleSheet } from 'react-native';

import { metrics, colors } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safe: { flex: 1, flexDirection: 'column' },
  pd15: { padding: 15 },
  pd10: { padding: 10 },
  title: { color: colors.white, fontSize: 18, fontWeight: '700' },
  deliveryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center',
  },
  colorItem: { color: colors.white },
  checkBox: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  addressName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  divider: { backgroundColor: '#fff' },
  mg15: { margin: 15 },
  icon: { marginRight: 5, marginTop: 3 },
});

export default styles;
