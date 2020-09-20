import { ENVIRONMENT_CONFG } from 'react-native-dotenv';

import DeviceInfo from 'react-native-device-info';

export const VERSION_NUMBER = DeviceInfo.getVersion();
export const BUILD_NUMBER = DeviceInfo.getBuildNumber();
export const ENVIRONMENT = ENVIRONMENT_CONFG;
export const SERVER_URL = 'http://localhost:3000';
