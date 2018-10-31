function getLocation() {
  var lat;
  var lng;
  var getLocation = navigator.geolocation.getCurrentPosition(function(position) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;

        var latlong = new google.maps.LatLng(lat, lng);
        var mapOptions = {
          center: latlong,
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("mainMap"), mapOptions);
        var marker = new google.maps.Marker({
          position: latlong,
          map: mainMap});

      }, function() {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  })
}
getLocation();
