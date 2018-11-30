var acc = document.getElementsByClassName("tutorialOptionsAccordion");
var i;
for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
};

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
