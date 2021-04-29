import { StyleSheet } from 'react-native';

import { metrics, colors } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fx02: { flex: 0.2 },
  title: { color: '#000', fontSize: 20, fontWeight: '700' },
  colorItem: { color: '#000' },
  checkBox: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  containerQuestions: { marginBottom: 20, marginTop: 8 },
  questionItem: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  itemDifficultyRed: {
    width: 70,
    height: 70,
    borderRadius: 15,
    backgroundColor: '#f00',
  },
  itemDifficultyYellow: {
    width: 70,
    height: 70,
    borderRadius: 15,
    backgroundColor: '#ff0',
  },
  itemDifficultyGreen: {
    width: 70,
    height: 70,
    borderRadius: 15,
    backgroundColor: '#0f0',
  },
});

export default styles;
