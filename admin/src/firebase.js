import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBcWrOMPfrwfbTtVXBCvCC8uNmAgj0IfA0",
    authDomain: "movietonight-9b1ec.firebaseapp.com",
    projectId: "movietonight-9b1ec",
    storageBucket: "movietonight-9b1ec.appspot.com",
    messagingSenderId: "721634030877",
    appId: "1:721634030877:web:b748ee58ee2d3988f09df4"
  };
  
  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();
  export default storage;