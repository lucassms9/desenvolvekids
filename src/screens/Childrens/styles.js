import { StyleSheet } from 'react-native';

import { metrics, colors } from '~/styles';

const styles = StyleSheet.create({
  safe: { flex: 1, flexDirection: 'column' },
  container: {
    flex: 1,
  },
  title: { color: '#fff', fontSize: 18, fontWeight: '700' },
  dividir: { backgroundColor: colors.white },
  subTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  childrenItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    alignItems: 'center',
  },
  pd15: { padding: 15 },
  pd10: { padding: 10 },
  mg15: { margin: 15 },
  icone: { marginRight: 5, marginTop: 3 },
});

export default styles;
