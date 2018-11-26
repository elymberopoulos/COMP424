function initMap() {
  mapLocate();
  

  //FIREBASE
  const db = firebase.database();
  const usersDBEndPoint = db.ref("users");

  //EVENT LISTENERS HERE
  var refreshOutput = document.getElementById("submitNameSearch").addEventListener("click", outputUsers);
  var findAllUsersBtn = document.getElementById("findAllUsersBtn").addEventListener("click", refreshDatabaseValues);

  ////////////////////////////////////////////////////////////////////////////

  // var userLocations = [

  //   {
  //     lat: 41.9999,
  //     lng: -87.6578
  //   },
  //   {
  //     lat: 41.878876,
  //     lng: -87.635918
  //   },
  //   {
  //     lat: 41.948437,
  //     lng: -87.655334
  //   },
  //   {
  //     lat: 43.092461,
  //     lng: -79.047150
  //   },
  // ]

  // FIREBASE TEST ARRAY

  var testArray = [{
    "Derek Smith": {
      lat: 41.9999,
      lng: -87.6578
    },
    "Anne Hathaway": {
      lat: 41.9689,
      lng: -87.6598
    },
    "Ryan Reynolds": {
      lat: 41.9589,
      lng: -87.6498
    }
  }];

  var users = [];


  /////////////////////////////////////////////////////////////////////////////////

  var map = new google.maps.Map(document.getElementById('mainMap'), {
    zoom: 9
  });
  var infoWindow = new google.maps.InfoWindow;

  function mapLocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        infoWindow.open(map);
        map.setCenter(pos);
      }, function () {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser does not support geolocation.');
    infoWindow.open(map);
  }

  function refreshDatabaseValues() {
    users.length = 0;
    db.ref("users/").once('value')
      .then((snapshot) => {
        snapshot.forEach((siteSnapshot) => {
          // console.log(siteSnapshot.key);
          // console.log(siteSnapshot.val());
          users.push({
            id: siteSnapshot.key,
            ...siteSnapshot.val()
          });
        });
        console.log("users array = ", users);
        outputUsers(users);
      })
      .catch((error) =>{
        console.log("error is: " + error)
      });
  }
  function outputUsers(users){
    console.log("function triggered");
    var userLength = users.legnth;
    var i
    for(i = 0; i < userLength; i++){
      // console.log(users[i].id);
      // console.log(users[i].location[0].lat);
      // console.log(users[i].location[1].lng);
    }
  }

  function refreshMarkers() {
    var markers = userLocations.map(function (location, i) {
      return new google.maps.Marker({
        position: location,
      });
    });

    var markerCluster = new MarkerClusterer(map, markers, {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });
  }

}
initMap()