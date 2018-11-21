function initMainPage() {
  var hideHeaderBtn = document.getElementById("hideHeader").addEventListener("click", hideHeaderFunction);
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


  function hideHeaderFunction() {
    document.getElementById("webSiteHeader").style.display = "none";
    document.getElementById("navSection").style.display = "none";
    document.getElementById("hiddenHeader").style.display = "block";
    document.getElementById("mainMap").classList.add("verticallyExpandedMap");
    google.maps.event.trigger(mainMap, 'resize');
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
      window.location.replace("index.html");
      }
  });
  function logOut(){
    firebase.auth().signOut();
    console.log("logged out");
  }
  mainApp.logOut = logOut;
})();
