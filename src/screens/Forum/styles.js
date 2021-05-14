import { StyleSheet } from 'react-native';

import { metrics, colors } from '~/styles';

const styles = StyleSheet.create({
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,

  },
  optionsItem: { color: '#000', fontWeight: '700' },
  forumItem: {
    backgroundColor: '#fff',
    marginBottom: 20,
    maxHeight: 620,
    padding: 10,
    borderRadius: 10,
  },
  mb5: { marginBottom: 5 },
  mb10: {
    marginBottom: 10,
  },
  ft18: { fontSize: 18 },
  pd40: { paddingBottom: 40 },
  fdr: { flexDirection: 'row' },
  forumBody: {
    backgroundColor: '#eee',
    borderRadius: 10,
    padding: 10,
    maxHeight: 350,
  },
  labelName: {
    fontWeight: '700',
    marginRight: 5,
  },
  divider: {
    backgroundColor: colors.blue,
    marginTop: 5,
  },
  wd90: { width: '90%' },
  btn: {
    backgroundColor: colors.primary,
    marginTop: 8,
    borderRadius: 25,
  },
});

export default styles;
