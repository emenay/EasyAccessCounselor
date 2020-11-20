import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/app';
import 'firebase/functions';

import config from './config';

firebase.initializeApp(config);


export const functions = firebase.app().functions('us-east1');

export const signOut = () => {
    firebase.auth().signOut();
}

export const db = firebase.firestore();
export const auth = firebase.auth();
export const currentUser = firebase.auth().currentUser;
export const emailAndPassword = firebase.auth.EmailAuthProvider.PROVIDER_ID;
