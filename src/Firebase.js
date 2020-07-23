import * as firebase from 'firebase';
//import firestore from 'firebase/firestore'
//const settings = {timestampsInSnapshots: true};

const config = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: "where-is-wall-e",
  storageBucket: "where-is-wall-e.appspot.com"
};

firebase.initializeApp(config);

//firebase.firestore().settings(settings);

export default firebase;