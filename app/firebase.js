import firebase from 'firebase';

class FirebaseSvc {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: 'AIzaSyDbDJJDct9UPIi_-fXiteTOoomjcIwpptQ',
        authDomain: 'signer-e2257.firebaseapp.com',
        databaseURL: 'https://signer-e2257.firebaseio.com',
        projectId: 'signer-e2257',
        storageBucket: 'signer-e2257.appspot.com',
        messagingSenderId: '208002811190'
      });
    }
  }
}

const firebaseSvc = new FirebaseSvc();

export default firebaseSvc;
