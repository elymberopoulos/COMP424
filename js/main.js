function initMainPage() {
  var i;
  var myMap, mainWindow;
  var acc = document.getElementsByClassName("mapOptionsAccordion");
  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("activeMapAccordion");
      var mapOptionsPanel = this.nextElementSibling;
      if (mapOptionsPanel.style.maxHeight){
        mapOptionsPanel.style.maxHeight = null;
      } else {
        mapOptionsPanel.style.maxHeight = mapOptionsPanel.scrollHeight + "px";
      }
    });
  }

}
initMainPage();


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
