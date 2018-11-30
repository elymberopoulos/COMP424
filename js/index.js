// Initialize Firebase

  // Initialize Firebase
  var config = {

  };
  firebase.initializeApp(config);

  const db = firebase.database();
  console.log(db);

  //var facebookLogin = document.getElementById('facebookLogin').addEventListener('click', facebookSignIn);
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  console.log(googleProvider);

  const startLogin = () => {
    return firebase.auth().signInWithPopup(googleProvider);
  };

  //const facebookProvider = new firebase.auth.FacebookAuthProvider();
  // function googleSignIn() {
  //
  //   console.log("Google login clicked.");
  //   //console.log(googleProvider);
  //   //firebase.auth().languageCode = firebase.auth().useDeviceLanguage();
  //   return firebase.auth().signInWithPopup(googleProvider);
  //   // then(function(result) {
  //   //
  //   //   var token = result.credential.accessToken;
  //   //
  //   //   var user = result.user;
  //   //
  //   // }).catch(function(error) {
  //   //   var errorCode = error.code;
  //   //   var errorMessage = error.message;
  //   //   var email = error.email;
  //   //   var credential = error.credential;
  //   //
  //   // });
  //   // checkLoginStatus();
  //
  // }

  // function facebookSignIn() {
  //   console.log("Facebook login clicked.");
  //   console.log(facebookProvider);
  //   firebase.auth().languageCode = firebase.auth().useDeviceLanguage();
  //   firebase.auth().signInWithPopup(facebookProvider);
  //   // checkLoginStatus();
  //   // then(function(result) {
  //   //
  //   //   var token = result.credential.accessToken;
  //   //
  //   //   var user = result.user;
  //   //
  //   // }).catch(function(error) {
  //   //   var errorCode = error.code;
  //   //   var errorMessage = error.message;
  //   //   var email = error.email;
  //   //   var credential = error.credential;
  //   //
  //   // });
  // }
  firebase.auth().onAuthStateChanged((user) => {

  if (user) {

    console.log('user logged in');
  } else {

    console.log('user logged out');
  }
});

var googleLogin = document.getElementById('submit-login');
googleLogin.addEventListener('click', startLogin);

var mainApp = {};
(function (){

  var uid = null;
  firebase.auth().onAuthStateChanged(function(user){
    if (user) {
      uid = user.uid;
    }else{
      uid = null;
      window.location.replace("loggedOut.html");
      }
  });
  function logOut(){
    firebase.auth().signOut();
    console.log("logged out");
  }
  mainApp.logOut = logOut;
})();
