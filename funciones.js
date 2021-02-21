    /* Note: This example requires that you consent to location sharing when
     * prompted by your browser. If you see the error "Geolocation permission
     * denied.", it means you probably did not give permission for the browser * to locate you. */
    let pos;
    let map;
    let bounds;
    let infoWindow;
    let currentInfoWindow;
    let service;
    let infoPane;
    let palabra_clave = '';
    let palabra_clave2 = '';
    let radio = 2000;
    let temp = 2000;
    let tempResponse;


    function initMap() {
      // Initialize variables
      bounds = new google.maps.LatLngBounds();
      infoWindow = new google.maps.InfoWindow;
      currentInfoWindow = infoWindow;
      /* TODO: Step 4A3: Add a generic sidebar */

      // Try HTML5 geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          map = new google.maps.Map(document.getElementById('map'), {
            center: pos,
            zoom: 15
          });
          bounds.extend(pos);

          infoWindow.setPosition(pos);
          infoWindow.setContent('Tu posición actual.');
          infoWindow.open(map);
          map.setCenter(pos);

          marker = new google.maps.Marker({
          map: map,
          draggable: true,
          animation: google.maps.Animation.DROP,
          position: pos,
          });

          marker.addListener("click", toggleBounce);
       

          function toggleBounce() {
            if (marker.getAnimation() !== null) {
              marker.setAnimation(null);
            } else {
              marker.setAnimation(google.maps.Animation.BOUNCE);
            }
          }

          /* TODO: Step 3B2, Call the Places Nearby Search */
          // Call Places Nearby Search on user's location

        }, () => {
          // Browser supports geolocation, but user has denied permission
          handleLocationError(true, infoWindow);
        });
      } else {
        // Browser doesn't support geolocation
        handleLocationError(false, infoWindow);
      }
    }

    // Handle a geolocation error
    function handleLocationError(browserHasGeolocation, infoWindow) {
      // Set default location to Sydney, Australia
      pos = { lat: -33.856, lng: 151.215 };
      map = new google.maps.Map(document.getElementById('map'), {
        center: pos,
        zoom: 15
      });

      // Display an InfoWindow at the map center
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
        'Geolocation permissions denied. Using default location.' :
        'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
      currentInfoWindow = infoWindow;

      /* TODO: Step 3B3, Call the Places Nearby Search */
      // Call Places Nearby Search on the default location
    }

    /* TODO: Step 3B1, Call the Places Nearby Search */
    // Perform a Places Nearby Search Request
    function getNearbyPlaces() {

      //const locaOPC = {4.7087715,-74.0871269};
      //const input = document.user_form.action = "";
      const input = document.getElementById("lname").value;
      console.log(input);

      let request = { location : pos, radius : radio, name: input};

      service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, nearbyCallback);

    }

    // Handle the results (up to 20) of the Nearby Search
    function nearbyCallback(results, status) {

      if (status == google.maps.places.PlacesServiceStatus.OK) {
        //var num = results.length;
        //alert("se encontraton "+ num +" cerca.");
        console.log(results);
        createMarkers(results);
        //distancia (results);
      }
      /*else {
        var km = radio/1000;
        var km = km.toString();
        alert("No Hay "+ palabra_clave+" en "+ km +" Km.");
          }*/
    }

    /* TODO: Step 3C, Generate markers for search results */
    // Set markers at the location of each place result
    
