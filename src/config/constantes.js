import { ENVIRONMENT_CONFG, SERVER_URL_CONFG } from 'react-native-dotenv';

import DeviceInfo from 'react-native-device-info';

export const VERSION_NUMBER = DeviceInfo.getVersion();
export const BUILD_NUMBER = DeviceInfo.getBuildNumber();
export const ENVIRONMENT = ENVIRONMENT_CONFG;
// export const SERVER_URL = SERVER_URL_CONFG;
export const SERVER_URL = 'http://homolog.desenvolvekids.com.br/api';
// export const SERVER_URL = 'http://localhost:3000';
export const ENCRYPTION_KEY = 'ek_test_2J8RLsBAsc5cAzXlCG4VawnhbwGdmU';
