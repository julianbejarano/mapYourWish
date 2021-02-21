 
function goTo (des)

{     
        var request = 
        {
          origin: pos,
          destination: des,
          travelMode: 'WALKING'
        } 

          var directionsService = new google.maps.DirectionsService();
          var directionsRenderer = new google.maps.DirectionsRenderer();

          directionsRenderer.setMap(map);
         
         directionsService.route(request, function answer (response, status) 
                                          {
                                            if (status == 'OK') 
                                              {
                                                    directionsRenderer.setDirections(response);
                                                      // Display the distance:
                                                    var distancia = response.routes[0].legs[0].distance.value
                                                    var tiem = response.routes[0].legs[0].duration.value;
                                                    var tiem = Math.round((tiem/60)/2.7);

                                                    
                                                    document.getElementById('distancia').innerHTML += 
                                                    distancia + " metros<br>";

                                                    document.getElementById('tiempo').innerHTML += 
                                                    tiem + " min aprox en bici.<br>";
                                              }

                                          } 
                                );

      
}



/*
https://stackoverflow.com/questions/2472482/directions-distance-in-google-maps-api-v3
https://developers.google.com/maps/documentation/javascript/directions
https://www.youtube.com/watch?v=ThjkwiZaSP4&ab_channel=GermanRodriguez

*/