function initMap() {
  mapLocate();


  //FIREBASE
  const db = firebase.database();
  const usersDBEndPoint = db.ref("users");

  //EVENT LISTENERS HERE
  var refreshOutput = document.getElementById("submitNameSearch").addEventListener("click", outputUsers);
  var findAllUsersBtn = document.getElementById("findAllUsersBtn").addEventListener("click", refreshDatabaseValues);
  var findAllUsersBtn = document.getElementById("monitorAllUsersBtn").addEventListener("click", monitorDatabaseValues);
  var clearUserDataBtn = document.getElementById("clearUserDataBtn").addEventListener("click", clearUserData);
  var monitoring = false;


  var userOutputList = document.getElementById("listOfUsers");
  var userPanel = document.getElementById("userPanel");

  var users = [];
  var userLocations = [];
  ////////////////////////////////////////////////////////////////////////////





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
        infoWindow.setContent('Your Location');
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
          console.log(siteSnapshot.key);
          console.log(siteSnapshot.val());
          users.push({
            id: siteSnapshot.key,
            ...siteSnapshot.val()
          });
        });
        console.log("users array = ", users);
        //outputUsers();
      })
      .catch((error) => {
        console.log("error is: " + error)
      });
  }

  function monitorDatabaseValues() {
    console.log("monitor DB function clicked");
    if (!monitoring) {
      console.log("Monitoring DB now.");
      monitoring = true;
      db.ref('users/').on('child_changed', (snapshot) => {
        users.length = 0;
        console.log('child changed = ', snapshot.key, snapshot.val());
        snapshot.forEach((siteSnapshot) => {
          console.log(siteSnapshot.key);
          console.log(siteSnapshot.val());
          users.push({
            id: siteSnapshot.key,
            ...siteSnapshot.val()
          });
        });
        console.log("users array = ", users);
      });
    } else {
      console.log("DB monitoring off.")
      monitoring = false;
      db.ref().off();
    }
  }

  function clearUserData() {
    console.log("Clear data function clicked.");
    userLocations.length = 0;
    markerCluster.setMap(null);


    while (userPanel.hasChildNodes()) {
      userPanel.removeChild(userPanel.firstChild);
    }
  }

  function outputUsers() {
    userLocations.length = 0;
    //console.log("function triggered");
    while (userPanel.hasChildNodes()) {
      userPanel.removeChild(userPanel.firstChild);
    }

    var userLength = users.length;
    var outputDiv = document.createElement("div");
    console.log("USER LENGTH " + userLength);

    for (var i = 0; i < userLength; i++) {

      var id = users[i].id;
      var userLat = users[i].location.lat;
      var userLng = users[i].location.lng;
      var node = document.createElement("div");

      var Latlng = new google.maps.LatLng(userLat, userLng);
      var marker = new google.maps.Marker({
        position: Latlng,
        label: id
      });
      userLocations.push(marker);

      node.classList.add("userNode");

      var idTextNode = document.createTextNode(id);
      var latTextNode = document.createTextNode("LAT: " + userLat);
      var lngTextNode = document.createTextNode("LNG: " + userLng);
      node.appendChild(idTextNode);
      node.appendChild(document.createElement("br"));
      node.appendChild(latTextNode);
      node.appendChild(document.createElement("br"));
      node.appendChild(lngTextNode);
      node.addEventListener("click", showLocation);

      userPanel.appendChild(node);

    }
    var markerCluster = new MarkerClusterer(map, userLocations, {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });
  }

  function displayMarkers() {
    var markers = userLocations.map(function (location, i) {
      return new google.maps.Marker({
        position: location,
      });
    });

  }

  function showLocation() {
    alert("node clicked \n" + this.innerText);

  }
}



initMap()