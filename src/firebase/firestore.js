import firebase from 'firebase/app';
import 'firebase/firestore';
import config from './config';

firebase.initializeApp(config);
const settings = { timestampsInSnapshots: true };
firebase.firestore().settings(settings);
const db = firebase.firestore();

export default db;
