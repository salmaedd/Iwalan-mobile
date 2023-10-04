import RNFirebase from 'react-native-firebase';

const configurationOptions = {
  debug: true,
  promptOnMissingPlayServices: false,
  apiKey: 'AIzaSyDnfQ7y17hwZIT3O6NqIgNdHu111SgCCKU',
  authDomain: 'Iwalane-38855.firebaseapp.com',
  databaseURL: 'https://console.firebase.google.com/u/0/project/Iwalane-38855/',
  projectId: 'Iwalane-38855',
  persistence: true,
  clientId: 'x',
  messagingSenderId: 'x',
  storageBucket: 'x',
  appId: 'AIzaSyDnfQ7y17hwZIT3O6NqIgNdHu111SgCCKU',
};

const firebase = RNFirebase.initializeApp(configurationOptions);

export default firebase;
