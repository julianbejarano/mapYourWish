function createMarkers(places) {
      var output = document.getElementById("fondo");
      const infowindow = new google.maps.InfoWindow();

      var icon = { url: 'https://lh3.googleusercontent.com/-VFWQury32FQ/YDCa1ZgUs2I/AAAAAAAATLM/dA9Hzg6ymNMr88jsOvBwkLP9HG-7UKnTwCLcBGAsYHQ/biciSmall.png',
          size: new google.maps.Size(30 , 30),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(0, 10)};

          // Shapes define the clickable region of the icon. The type defines an HTML
          // <area> element 'poly' which traces out a polygon as a series of X,Y points.
          // The final coordinate closes the poly by connecting to the first coordinate.
          const shape = {
            coords: [1, 1, 1, 20, 18, 20, 18, 1],
            type: 'poly',
          };
      
      let marker= [];
      
          // Clear out the old markers.
          marker.forEach((marker) => {
            marker.setMap(null);
          });
      

      places.forEach(place => {
        let marker = new google.maps.Marker({
          position: place.geometry.location,
          map: map,
          icon: icon,
          title: place.name
        });


        goTo(place.geometry.location);

        
        google.maps.event.addListener(marker, "click", function () {
              infowindow.setContent(
                "<div><strong>"+
                  place.name +
                  "</strong><br>" +
                  "Place ID: " +
                  place.place_id +
                  "<br>" +
                  place.vicinity +
                  "</div>"
              );
              infowindow.open(map, this);

            });
        output.innerHTML += place.name + " <br>";

        /* TODO: Step 4B: Add click listeners to the markers */

        // Adjust the map bounds to include the location of this marker
        bounds.extend(place.geometry.location);
      });
      /* Once all the markers have been placed, adjust the bounds of the map to
       * show all the markers within the visible area. */
      map.fitBounds(bounds);
    }

    /* TODO: Step 4C: Show place details in an info window */

