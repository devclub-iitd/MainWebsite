import firebase from 'firebase/app';
import 'firebase/firestore';
import config from '../config/firebase_config';

firebase.initializeApp(config);
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

export default firestore;
