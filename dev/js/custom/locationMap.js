function initialize() {
    var natickJson, medwayJson, sherbornJson,
        natickId = {
            placeId: "ChIJldxiFlWG44kRIcGAOMhoOvQ"
        },
        medwayId = {
            placeId: "ChIJ0fcOX_Fw5IkRG9qI1CSPhec"
        },
        sherbornId = {
            placeId: "ChIJWXXKjxB45IkRc1Mr--1Wl9k"
        },
        locations = [
            [42.299368, -71.293149, "Seishin Wellesley"],
            [42.288411, -71.336564, "Seishin Natick"],
            [42.151688, -71.412065, "Seishin Medway"],
            [42.240563, -71.369701, "Seishin Sherborn"],
            [42.323506, -71.325346, "Seishin Weston"]

        ],
        infowindow = new google.maps.InfoWindow({maxWidth: 1000}),
        service = new google.maps.places.PlacesService(map);
    $.when(
        service.getDetails(natickId, function (place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                natickJson = place;
                if (natickJson.opening_hours.open_now) {
                    $('#Natick-Status').attr({
                        style: 'color:#23D613;font-size: 15px;vertical-align:middle;',
                        title: 'Open Now'
                    });
                }
                else {
                    $('#Natick-Status').attr({
                        style: 'color:#ed4b43;font-size: 15px;vertical-align:middle;',
                        title: 'Closed Now'
                    });
                }
                $('#Natick-Status').tooltip();
            }
        }),
        service.getDetails(medwayId, function (place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                medwayJson = place;
                if (medwayJson.opening_hours.open_now) {
                    $('#Medway-Status').attr({
                        style: 'color:#23D613;font-size: 15px;vertical-align:middle;',
                        title: 'Open Now'
                    });
                }
                else {
                    $('#Medway-Status').attr({
                        style: 'color:#ed4b43;font-size: 15px;vertical-align:middle;',
                        title: 'Closed Now'
                    });
                }
                $('#Medway-Status').tooltip();
            }
        }),
        service.getDetails(sherbornId, function (place, status) {
            if (status === google.maps.places.PlacesServiceStatus.OK) {
                sherbornJson = place;
                if (sherbornJson.opening_hours.open_now) {
                    $('#Sherborn-Status').attr({
                        style: 'color:#23D613;font-size: 15px;vertical-align:middle;',
                        title: 'Open Now'
                    });

                }
                else {
                    $('#Sherborn-Status').attr({
                        style: 'color:#ed4b43;font-size: 15px;vertical-align:middle;',
                        title: 'Closed Now'
                    });
                }
                $('#Sherborn-Status').tooltip();
            }
        })
    )
        .done(
            function () {
                var map = new google.maps.Map(document.getElementById('map'), {
                    center: new google.maps.LatLng(42.240524, -71.369647),
                    zoom: 11,
                    scrollwheel: false
                });
                google.maps.event.addListener(infowindow, 'domready', function () {
                    $(".fa").tooltip();
                });
                for (var i = 0; i < locations.length; i++) {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(locations[i][0], locations[i][1]),
                    map: map,
                    title: locations[i][2]
                });
                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        var html;
                        if (marker.title === "Seishin Medway") {
                            html = '<b>Seishin Medway</b>&nbsp;&nbsp;' + getClosed(medwayJson) + '<br>' +
                                '<a href="tel:508-533-1501">(508) 533-1501</a><br>' +
                                '<a href="https://maps.google.com/maps?saddr=My+Location&daddr=Seishin+Martial+Arts+%2F+Sport+Karate+Academy,+74+Main+St,+Medway,+MA+02053" target="_blank"><i class="fa fa-location-arrow" style="font-size: 27px; padding-right: 4px" data-toggle="tooltip" data-placement="bottom" title="Directions"></i></a>' +
                                '<a href="https://plus.google.com/+SeishinMartialArtsSportKarateAcademyMedway/about?hl=en" target="_blank"><i class="fa fa-map-marker" style="font-size: 27px;padding-left: 4px; padding-right: 3px;" data-toggle="tooltip" data-placement="bottom" title="Write A Review"></i></a>' +
                                '<a href="medway.html"><i class="fa fa-info-circle" data-toggle="tooltip" data-placement="bottom" title="More Info" style="font-size: 27px; margin-left: 6px"></i></a>' + '<br>' +
                                getPhotos(medwayJson);
                        }
                        else if (marker.title === "Seishin Sherborn") {
                            html = '<b>Seishin Sherborn</b>&nbsp;&nbsp;' + getClosed(sherbornJson)  + '<br>' +
                                '<a href="tel:508-433-0901">(508) 433-0901</a><br>' +
                                '<a href="https://maps.google.com/maps?saddr=My+Location&daddr=Seishin+Martial+Arts+%2F+Sport+Karate+Academy,+11+S+Main+St,+Sherborn,+MA+01770" target="_blank"><i class="fa fa-location-arrow" style="font-size: 27px; padding-right: 4px" data-toggle="tooltip" data-placement="bottom" title="Directions"></i></a>' +
                                '<a href="https://plus.google.com/+SeishinMartialArtsSportKarateAcademySherborn/about?hl=en" target="_blank"><i class="fa fa-map-marker" style="font-size: 27px;padding-left: 4px; padding-right: 3px;" data-toggle="tooltip" data-placement="bottom" title="Write A Review"></i></a>' +
                                '<a href="sherborn.html"><i class="fa fa-info-circle" data-toggle="tooltip" data-placement="bottom" title="More Info" style="font-size: 27px; margin-left: 6px"></i></a>' + '<br>' +
                                getPhotos(sherbornJson);
                        }
                        else if (marker.title === "Seishin Natick") {
                            html = '<b>Seishin Natick</b>&nbsp;&nbsp;' + getClosed(natickJson) + '<br>' +
                                '<a href="tel:508-433-0901">(508) 433-0901</a><br>' +
                                '<a href="https://maps.google.com/maps?saddr=My+Location&daddr=Seishin+Martial+Arts%2F+Sport+Karate+Academy,+124+E+Central+St,+Natick,+MA+01760" target="_blank"><i class="fa fa-location-arrow" style="font-size: 27px; padding-right: 4px" data-toggle="tooltip" data-placement="bottom" title="Directions"></i></a>' +
                                '<a href="https://plus.google.com/+SeishinMartialArtsSportKarateAcademyNatick/about?hl=en" target="_blank"><i class="fa fa-map-marker" style="font-size: 27px;padding-left: 5px; padding-right: 5px;" data-toggle="tooltip" data-placement="bottom" title="Write A Review"></i></a>' +
                                '<a href="natick.html"><i class="fa fa-info-circle" data-toggle="tooltip" data-placement="bottom" title="More Info" style="font-size: 27px; margin-left: 6px"></i></a>' + '<br>' +
                                getPhotos(natickJson);
                        }
                        else if (marker.title === "Seishin Wellesley") {
                            html = '<b>Seishin Wellesley</b>&nbsp;&nbsp;' + '<i class="fa fa-circle" style="color:#707070" data-toggle="tooltip" title="Status Unavailable">' + '<br>' +
                                '<a href="tel:508-319-1775">(508) 319-1775</a><br>' +
                                '<a href="https://maps.google.com/maps?saddr=My+Location&daddr=Miss+Michelle\'s+Center+for+the+Performing+Arts,+159+Linden+St,+Wellesley,+MA+02482" target="_blank"><i class="fa fa-location-arrow" style="font-size: 27px; padding-right: 4px" title="Directions to Seishin in Wellesley"></i></a>' +
                                '<a href="wellesley.html"><i class="fa fa-info-circle" data-toggle="tooltip" data-placement="bottom" title="More Info" style="font-size: 27px; margin-left: 6px"></i></a>' + '<br>';
                        }
                        else if (marker.title === "Seishin Weston") {
                            html = '<b>Seishin Weston</b>&nbsp;&nbsp;' + '<i class="fa fa-circle" style="color:#707070" data-toggle="tooltip" title="Status Unavailable">' + '<br>' +
                                '<a href="tel:508-319-1775">(508) 319-1775</a><br>' +
                                '<a href="https://maps.google.com/maps?saddr=My+Location&daddr=The+Rivers+School,+333+Winter+Street,+Weston,+MA+02493" target="_blank"><i class="fa fa-location-arrow" style="font-size: 27px; padding-right: 4px" title="Directions to Seishin in Weston"></i></a>' +
                                '<a href="weston.html"><i class="fa fa-info-circle" data-toggle="tooltip" data-placement="bottom" title="More Info" style="font-size: 27px; margin-left: 6px"></i></a>' + '<br>';
                        }
                        infowindow.setContent(html);
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            }
        }
    );

    function getClosed (json) {
        if (json.opening_hours.open_now) {
            return '<i class="fa fa-circle" style="color:#23D613;margin-right:22px" data-toggle="tooltip" title="Open Now"></i>'
        }
        else {
            return '<i class="fa fa-circle" style="color:#ed4b43;margin-right:22px" data-toggle="tooltip" title="Closed Now"></i>'
        }
    }
    function getPhotos (json) {
        var photos = "";
        for (var i = 0; i < 4; i++) {
            photos += '<a href="' + json.photos[i].getUrl({'maxHeight': json.photos[i].height}) + '" target="_blank"><img src="' + json.photos[i].getUrl({'maxHeight': 35}) + '" height="35" style="padding: 5px 1px" title="Click to enlarge">';
        }
        return photos;
    }
}


function loadScript () {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=places&' + 'callback=initialize';
    document.body.appendChild(script);
}