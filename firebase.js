const firebaseConfig = {
apiKey: "YOUR_KEY",
authDomain: "YOUR_DOMAIN",
projectId: "YOUR_PROJECT",
storageBucket: "YOUR_BUCKET",
messagingSenderId: "XXXX",
appId: "XXXX"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const db = firebase.firestore();
