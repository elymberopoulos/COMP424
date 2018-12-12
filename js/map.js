function initMap() {
  mapLocate();

  //FIREBASE
  const db = firebase.database();
  const usersDBEndPoint = db.ref("users");

  //EVENT LISTENERS HERE
  //search button
  var refreshOutput = document.getElementById("submitNameSearch").addEventListener("click", outputUsers);

  var findAllUsersBtn = document.getElementById("findAllUsersBtn").addEventListener("click", refreshDatabaseValues);
  var clearUserDataBtn = document.getElementById("clearUserDataBtn").addEventListener("click", clearUserData);
  //var findAllUsersBtn = document.getElementById("monitorAllUsersBtn").addEventListener("click", monitorDatabaseValues); IMPLEMENT LATER
  var monitoring = false; //monitors if DB ref is on in monitor data. Unused currently.

  
  var userOutputList = document.getElementById("listOfUsers");
  var userPanel = document.getElementById("userPanel");

  var users = []; //this array holds users retrieved from Firebase
  var userLocations = []; //this array hold Google Maps LatLng objects to be used by marker clusterer
  var markerCluster;
  ////////////////////////////////////////////////////////////////////////////

  var map = new google.maps.Map(document.getElementById('mainMap'), {zoom: 9});
  var infoWindow = new google.maps.InfoWindow;


  function mapLocate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

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
      })
      //.then(outputUsers)
      .catch((error) => {
        console.log("error is: " + error)
      });

  }

  //  IMPLEMENT LATER
  ////////////////////////////////////////////////
  // function monitorDatabaseValues() {
  //   console.log("monitor DB function clicked");
  //   if (!monitoring) {
  //     console.log("Monitoring DB now.");
  //     monitoring = true;
  //     db.ref('users/').on('child_changed', (snapshot) => {
  //       users.length = 0;
  //       console.log('child changed = ', snapshot.key, snapshot.val());
  //       snapshot.forEach((siteSnapshot) => {
  //         console.log(siteSnapshot.key);
  //         console.log(siteSnapshot.val());
  //         users.push({
  //           id: siteSnapshot.key,
  //           ...siteSnapshot.val()
  //         });
  //       });
  //       console.log("users array = ", users);
  //     });
  //   } else {
  //     console.log("DB monitoring off.")
  //     monitoring = false;
  //     db.ref().off();
  //   }
  // }
  ///////////////////////////////////////////////////////

  function outputUsers() {
    //Reset nodes to prevent node stacking
    userLocations.length = 0;

    while (userPanel.hasChildNodes()) {
      userPanel.removeChild(userPanel.firstChild);
    }

    var userLength = users.length;
    var outputDiv = document.createElement("div");
    console.log("USER LENGTH " + userLength);



    for (var i = 0; i < userLength; i++) {
      //Isolate JSON values and inject them into the DOM as nodes with event listeners
      var id = users[i].id;
      var userLat = users[i].location.lat;
      var userLng = users[i].location.lng;
      var emergencyContactName = users[i].emergencyContact.name;
      var emergencyContactNumber = users[i].emergencyContact.phone;
      var node = document.createElement("div");
      
      //create new Google Maps LatLng for the marker clusterer

      var Latlng = new google.maps.LatLng(userLat, userLng);
      var marker = new google.maps.Marker({
        position: Latlng,
      });
      userLocations.push(marker);

      node.classList.add("userNode");
      node.setAttribute("userName", id);
      node.setAttribute("latitude", userLat);
      node.setAttribute("longitude", userLng);

      var idTextNode = document.createTextNode(id);
      var latTextNode = document.createTextNode("LAT: " + userLat);
      var lngTextNode = document.createTextNode("LNG: " + userLng);
      var contact = document.createTextNode("I.C.E.: " + emergencyContactName);
      var contactNumber = document.createTextNode("Phone: " + emergencyContactNumber);

      node.appendChild(idTextNode);
      node.appendChild(document.createElement("br"));
      node.appendChild(latTextNode);
      node.appendChild(document.createElement("br"));
      node.appendChild(lngTextNode);
      node.appendChild(document.createElement("br"));
      node.appendChild(contact);
      node.appendChild(document.createElement("br"));
      node.appendChild(contactNumber);
      node.addEventListener("click", showLocation);

      userPanel.appendChild(node);

    }
    markerCluster = new MarkerClusterer(map, userLocations, {
      imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });
  }

  function clearUserData() {
    console.log("Clear data function clicked.");
    for (var i = 0; i < userLocations.length; i++) {
      userLocations[i].setMap(null);
    }

    while (userPanel.hasChildNodes()) {
      userPanel.removeChild(userPanel.firstChild);
    }

    infoWindow.close();
    markerCluster.clearMarkers();
    users = [];
    userLocations = [];

  }

  function showLocation() {

    var id = this.getAttribute("userName");
    var lat = this.getAttribute("latitude");
    var lng = this.getAttribute("longitude");

    var Latlng = new google.maps.LatLng(lat, lng);
    map.setCenter(Latlng);
    map.setZoom(14);
    infoWindow.setPosition(Latlng);
    infoWindow.setContent(id + " LAT: " + lat + " LNG: " + lng);
  }

}


initMap()

