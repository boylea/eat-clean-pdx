(function() { // namespace this shit

var map;

$(document).ready(function () {
    var mapOptions = {
      center: { lat: 45.531436, lng: -122.655222},
      zoom: 12
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    var req = new XMLHttpRequest();

    // Feature detection for CORS
    if ('withCredentials' in req) {
        req.open('GET', 'http://api.civicapps.org/restaurant-inspections/', true);
        // Just like regular ol' XHR
        req.onreadystatechange = function() {
            if (req.readyState === 4) {
                if (req.status >= 200 && req.status < 400) {
                    // JSON.parse(req.responseText) etc.
                    console.log("response:", req.responseText)
                } else {
                    // Handle error case
                    console.log("bummer")
                }
            }
        };
        req.send();
    }

});

}()); // end of namespace

