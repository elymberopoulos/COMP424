function initiateFirebase(){
  var config = {
  apiKey: "AIzaSyCVoSGosWTkRgL69T4Au3aGrCBgViBuI1M",
  authDomain: "rendezvous-219221.firebaseapp.com",
  databaseURL: "https://rendezvous-219221.firebaseio.com",
  projectId: "rendezvous-219221",
  storageBucket: "rendezvous-219221.appspot.com",
  messagingSenderId: "343762694139"
  };
  firebase.initializeApp(config);
};

initiateFirebase();
