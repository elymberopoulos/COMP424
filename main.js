function initMainPage(){
  var myMap, mainWindow;
function initMap() {
  myMap = new google.maps.Map(document.getElementById('mainMap'), {
    center: new google.maps.LatLng(41.881832 , -87.623177 ),
    zoom: 7});
  mainWindow = new google.maps.mainWindow;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var thisPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      mainWindow.setPosition(thisPosition);
      mainWindow.setContent('Location found.');
      mainWindow.open(myMap);
      myMap.setCenter(thisPosition);
    }, function() {
      handleLocationError(true, mainWindow, myMap.getCenter());
    });
  } else {

    handleLocationError(false, mainWindow, myMap.getCenter());
  }
}
function handleLocationError(browserHasGeolocation, mainWindow, thisPosition) {
  mainWindow.setPosition(thisPosition);
  mainWindow.setContent(browserHasGeolocation ?
    'Error: The Location did not work.' :
    'Error: Your browser does not support Location API.');
  mainWindow.open(myMap);
}
</script>
<script>
function setUpEvents(){
document.getElementById("hideHeader").addEventListener("click", hideHeaderFunction);
function hideHeaderFunction(){
  document.getElementById("webSiteHeader").style.display = "none";
  document.getElementById("navSection").style.display = "none";
  document.getElementById("hiddenHeader").style.display = "block";
  document.getElementById("mainMap").classList.add("verticallyExpandedMap");
  google.maps.event.trigger(mainMap, 'resize');
  setTimeout(initMap, 100);
}
}
window.onload = function(){
  setUpEvents();
}
}
