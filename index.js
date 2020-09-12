/**
 * @format
 */

import { AppRegistry, YellowBox } from 'react-native';
import 'react-native-gesture-handler';
YellowBox.ignoreWarnings([
  'RCTBridge',
  'Warning: componentWillUpdate has been renamed',
  'Warning: componentWillReceiveProps has been renamed',
]);
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
