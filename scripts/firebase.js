firebase.initializeApp({
    apiKey: "AIzaSyC1zrtwviz3Vm7Pc69kyn2OnR4BlE6I36Q",
    authDomain: "fd2-test-firebase.firebaseapp.com",
    databaseURL: "https://fd2-test-firebase.firebaseio.com",
    projectId: "fd2-test-firebase",
    storageBucket: "fd2-test-firebase.appspot.com",
    messagingSenderId: "735454255291"
});

var myAppDB = firebase.firestore();

myAppDB.settings({
    timestampsInSnapshots: true
});