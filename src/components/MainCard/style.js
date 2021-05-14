import { StyleSheet } from 'react-native';
import { commons, colors } from '~/styles';
const styles = StyleSheet.create({
  container: {
    padding: 0,
    // backgroundColor: '#fff',
    flex: 1,
    height: 380,
    marginBottom: 15,
    borderRadius: 15,
  },
  content: { flex: 0,marginVertical:10},
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  image: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4,
  },
  fx1: {
    flex: 1,
    justifyContent:'flex-start'
  },
  colorItem: { color: colors.white },
  checkBox: {
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderRadius: 10
  },
});

export default styles;
