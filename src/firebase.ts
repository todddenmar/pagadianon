// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: 'AIzaSyDfhF2tUdJOBRHX_hWo2TqTTrzKJN7e-6Y',
  authDomain: 'pagadiaon.firebaseapp.com',
  projectId: 'pagadiaon',
  storageBucket: 'pagadiaon.appspot.com',
  messagingSenderId: '883481767293',
  appId: '1:883481767293:web:2f623dcfeea1d00ba3f014',
  measurementId: 'G-ELQL871TFB',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage };
