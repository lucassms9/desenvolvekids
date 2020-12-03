/**
 * @format
 */

import { AppRegistry, YellowBox } from 'react-native';
import 'react-native-gesture-handler';
if (__DEV__) {
  import('~/config/reactotron').then(() =>
    console.log('Reactotron Configured'),
  );
}

console.disableYellowBox = true;
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
