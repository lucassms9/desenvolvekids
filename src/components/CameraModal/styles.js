import { StyleSheet } from 'react-native';

import { colors, metrics } from '~/styles';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.darkGray,
    flex: 1,
  },
  header: {
    height: 180,
    backgroundColor: 'rgba(255, 255, 255, .9)',
  },
  headerContainer: {
    flexDirection: 'column',
    marginLeft: metrics.appMargin,
    marginTop: metrics.appMargin * 2,
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  goBack: {
    color: colors.darkGray,
    marginLeft: metrics.appMargin,
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    height: 120,
    backgroundColor: colors.white,
  },
  buttonContainer: {
    alignSelf: 'center',
    backgroundColor: colors.white,
    borderWidth: 3,
    borderColor: colors.gray,
    width: 60,
    height: 60,
    marginTop: 15,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 50,
  },
  buttonLabel: {
    backgroundColor: colors.lightDanger,
    width: 48,
    height: 48,
    borderRadius: 50,
  },
  photoContainer: {
    flex: 1,
  },
  loadingContainer: {
    backgroundColor: colors.white,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 999,
  },
  photoOptions: {
    position: 'absolute',
    zIndex: 9999,
    flexDirection: 'row',
    width: '100%',
    bottom: 120,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoOption: {
    backgroundColor: colors.white,
    width: 50,
    height: 50,
    marginHorizontal: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    shadowColor: colors.darkGray,
    shadowOffset: { width: 2, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default styles;
