import { StyleSheet } from 'react-native';
import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: metrics.appMargin,
  },
  message: {
    color: colors.white,
    fontSize: 14,
    padding: 20,
  },
  tryAgainButton: {
    backgroundColor: colors.orange,
    marginTop: 6,
    paddingVertical: 12,
    paddingHorizontal: 18,
    height: 50,
    borderRadius: metrics.radius,
    justifyContent: 'center',
  },
  tryAgainText: {
    color: colors.white,
    fontWeight: 'bold',
    alignSelf: 'center',
    fontSize: 18,
  },
});

export default styles;
