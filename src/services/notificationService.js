import React from 'react';
import OneSignal from 'react-native-onesignal'; // Import package from node modules
import api from '~/services/api';

export function initNotification() {
  //Remove this method to stop OneSignal Debugging
  OneSignal.setLogLevel(6, 0);

  // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
  OneSignal.init('1f90ae75-f4f6-4763-b4b8-e348f719586e', {
    kOSSettingsKeyAutoPrompt: false,
    kOSSettingsKeyInAppLaunchURL: false,
    kOSSettingsKeyInFocusDisplayOption: 2,
  });
  OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

  // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
  OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

  OneSignal.addEventListener('received', onReceived);
  OneSignal.addEventListener('opened', onOpened);
  OneSignal.addEventListener('ids', onIds);
}

function onReceived(notification) {
  console.log('Notification received: ', notification);
}

function myiOSPromptCallback(permission) {
  // do something with permission value
  console.log(permission);
}

function onOpened(openResult) {
  console.log('Message: ', openResult.notification.payload.body);
  console.log('Data: ', openResult.notification.payload.additionalData);
  console.log('isActive: ', openResult.notification.isAppInFocus);
  console.log('openResult: ', openResult);
}

async function onIds(device) {
  console.log('Device info: ', device);
  if (device && device.userId) {
    const res = await api.post('user/save-token', {
      pushToken: device.userId,
    });
    console.log(res);
  }
}
