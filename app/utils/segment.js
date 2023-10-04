import analytics from '@segment/analytics-react-native';
import firebase from '@segment/analytics-react-native-firebase';
import axios from 'axios';
//import { FirebasePlugin } from '@segment/analytics-react-native-plugin-firebase';

export const segment = (url, body, method = 'POST') => {
  return axios.request({
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    auth: {
      //dev: JK3NIsxeyaN7YfuZYxC9BE2EJE7bR7oL
      //prod: rjZQmwgGG7EE3Lx1wDlmV24RYmyfRHEi
      username: 'JK3NIsxeyaN7YfuZYxC9BE2EJE7bR7oL',
      password: '',
    },
    data: body,
    url: `https://api.segment.io/v1/${url}`,
  });
};

export const segment_setup = () => {
  const PROD_KEY = 'DBMQ5kDxEW4Qk6XPlYgB89G9kFgE2vaU';
  const DEV_KEY = 'QyO3IIleDwZVdJCInTHHzbpG3ABQmeQZ';

  analytics.setup(PROD_KEY, {
    using: [firebase],
    recordScreenViews: true,
    trackAppLifecycleEvents: true,
    android: {
      flushInterval: 60000, // 60 seconds
      collectDeviceId: true,
    },
    ios: {
      trackAdvertising: true,
      trackDeepLinks: true,
    },
    // enable: true,
  });
  // analytics.add('Firebase');
  // analytics.add({ plugin: new FirebasePlugin() });
};
