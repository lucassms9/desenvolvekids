import { StatusBar, Platform } from 'react-native';
import { colors } from '~/styles';

if (Platform.OS === 'android') {
  StatusBar.setBackgroundColor(colors.header);
}
StatusBar.setBarStyle('light-content');
