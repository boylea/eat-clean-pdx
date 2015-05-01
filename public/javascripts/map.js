(function() { // namespace this shit

var map;

$(document).ready(function () {
    var mapOptions = {
      center: { lat: 45.531436, lng: -122.655222},
      zoom: 12
    };
    map = new google.maps.Map($('#map-canvas').get(0),
        mapOptions);

    $.getJSON('/report', function(data) {
        console.log('data!', data.length);
        // $.each(data, function(value, key) {
        for (key in data) {
            // console.log('data',key, data[key]['name']);
            createMarker(data[key]);
        };
    });
    
});

function createMarker(dataitem) {
    // creating an info window one at a time in a function allows proper
    // namespacing so that each info window is associated with correct marker
    var location = dataitem['location'];
    var resturant_latlng = new google.maps.LatLng(location['Latitude'], location['Longitude']);
    var marker = new google.maps.Marker({
        position: resturant_latlng,
        map: map,
        title: dataitem['name']
    });
    var infowindow = new google.maps.InfoWindow({
        content: dataitem['name'] + 'score: ' + dataitem['score']
    });
    google.maps.event.addListener(marker, 'click', function(){
        // infowindow.open(map, marker);
        $.getJSON('/inspection/'+dataitem.inspection_number, function(inspection) {
            console.log('inspection', inspection.length);
            var detail_text = dataitem['name'] + '<br>score: ' + inspection.score + '<br>date: ' + inspection.date;
            // detail_text += '<br>' + inspection.violations[0]['violation_rule']
            $('#inspection-details').html(detail_text);
        });
    });
}

}()); // end of namespace

