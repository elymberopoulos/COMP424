function initMap() {
  myMap = new google.maps.Map(document.getElementById('mainMap'), {
    center: new google.maps.LatLng(41.881832, -87.623177),
    zoom: 7
  });
  mainWindow = new google.maps.mainWindow;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var thisPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      myMap.setPosition(thisPosition);
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
initMap();
