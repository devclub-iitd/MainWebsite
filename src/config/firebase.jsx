import firebase from 'firebase/app';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyCKqIm-zELmxoCPDYdgOJQZGqxhYmmDnPk',
  authDomain: 'main-website-38951.firebaseapp.com',
  databaseURL: 'https://main-website-38951.firebaseio.com',
  projectId: 'main-website-38951',
  storageBucket: 'main-website-38951.appspot.com',
  messagingSenderId: '1027915638974',
};

firebase.initializeApp(config);
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

export default firestore;