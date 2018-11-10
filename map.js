var map, infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById('mainMap'), {
    center: {lat: -34.397, lng: 150.644},
    zoom: 6
  });
  infoWindow = new google.maps.InfoWindow;


  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      infoWindow.setPosition(pos);
      infoWindow.setContent('Location found.');
      infoWindow.open(map);
      map.setCenter(pos);
    }, function() {
      handleLocationError(true, infoWindow, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }
  var labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';


var markers = locations.map(function(location, i) {
return new google.maps.Marker({
position: location,
label: labels[i % labels.length]
});
});

var markerCluster = new MarkerClusterer(map, markers,
{imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
}
var locations = [

{lat: 41.9999, lng: -87.6578},
{lat: 41.878876, lng: -87.635918},
{lat: 41.948437, lng: -87.655334},
{lat: 43.092461, lng: -79.047150},
]
