'use strict';
$(function() {
    $("#about a:contains('About')").parent().addClass('active');
    $("#history a:contains('History')").parent().parent().parent().addClass('active').parent().addClass('active');
    $("#locations a:contains('Locations')").parent().parent().parent().addClass('active');
    $("#staff a:contains('Staff')").parent().parent().parent().addClass('active');
    $("#tournaments a:contains('Tournaments')").parent().parent().parent().addClass('active');
    $("#programs a:contains('Programs')").parent().addClass('active');
    $("#social a:contains('Social')").parent().addClass('active');
    $("#contact a:contains('Contact Us')").parent().addClass('active');
    $("a.tooltipLink").tooltip();
    $(".locationTooltip").tooltip({container: 'body'});


    var aboutAngle = 180,
        locationsAngle = 180;

    $( '#about-nav-click' ).click(function () {
        if ( $( "#locations-nav" ).is( ":hidden" ) && $( '#about-nav' ).is( ":hidden" )) {
            $('#about-arrow').css ({
                '-webkit-transform': 'rotate(' + aboutAngle + 'deg)',
                '-moz-transform': 'rotate(' + aboutAngle + 'deg)',
                '-o-transform': 'rotate(' + aboutAngle + 'deg)',
                '-ms-transform': 'rotate(' + aboutAngle + 'deg)'
            });
            aboutAngle+=180;
            $( '#about-nav' ).slideDown( 300 );
        }
        else if ($( "#locations-nav" ).is( ":visible" ) && $( '#about-nav' ).is( ":hidden" )) {
            $('#about-arrow').css ({
                '-webkit-transform': 'rotate(' + aboutAngle + 'deg)',
                '-moz-transform': 'rotate(' + aboutAngle + 'deg)',
                '-o-transform': 'rotate(' + aboutAngle + 'deg)',
                '-ms-transform': 'rotate(' + aboutAngle + 'deg)'
            });
            aboutAngle+=180;
            $('#locations-arrow').css ({
                '-webkit-transform': 'rotate(' + locationsAngle + 'deg)',
                '-moz-transform': 'rotate(' + locationsAngle + 'deg)',
                '-o-transform': 'rotate(' + locationsAngle + 'deg)',
                '-ms-transform': 'rotate(' + locationsAngle + 'deg)'
            });
            locationsAngle+=180;
            $( "#locations-nav" ).slideUp( 'fast' );
            $( '#about-nav' ).slideDown( 300 );
        }
        else {
            $('#about-arrow').css ({
                '-webkit-transform': 'rotate(' + aboutAngle + 'deg)',
                '-moz-transform': 'rotate(' + aboutAngle + 'deg)',
                '-o-transform': 'rotate(' + aboutAngle + 'deg)',
                '-ms-transform': 'rotate(' + aboutAngle + 'deg)'
            });
            aboutAngle+=180;
            $( '#about-nav' ).slideUp( 300 );
        }
    });
    $( '#locations-nav-click' ).click(function () {
        if ( $( "#about-nav" ).is( ":hidden" ) && $( '#locations-nav' ).is( ":hidden" )) {
            $('#locations-arrow').css ({
                '-webkit-transform': 'rotate(' + locationsAngle + 'deg)',
                '-moz-transform': 'rotate(' + locationsAngle + 'deg)',
                '-o-transform': 'rotate(' + locationsAngle + 'deg)',
                '-ms-transform': 'rotate(' + locationsAngle + 'deg)'
            });
            locationsAngle+=180;
            $( '#locations-nav' ).slideDown( 300 );
        }
        else if ($( "#about-nav" ).is( ":visible" ) && $( '#locations-nav' ).is( ":hidden" )) {
            $('#locations-arrow').css ({
                '-webkit-transform': 'rotate(' + locationsAngle + 'deg)',
                '-moz-transform': 'rotate(' + locationsAngle + 'deg)',
                '-o-transform': 'rotate(' + locationsAngle + 'deg)',
                '-ms-transform': 'rotate(' + locationsAngle + 'deg)'
            });
            locationsAngle+=180;
            $('#about-arrow').css ({
                '-webkit-transform': 'rotate(' + aboutAngle + 'deg)',
                '-moz-transform': 'rotate(' + aboutAngle + 'deg)',
                '-o-transform': 'rotate(' + aboutAngle + 'deg)',
                '-ms-transform': 'rotate(' + aboutAngle + 'deg)'
            });
            aboutAngle+=180;
            $( "#about-nav" ).slideUp( 'fast' );
            $( '#locations-nav' ).slideDown( 300 );
        }
        else {
            $('#locations-arrow').css ({
                '-webkit-transform': 'rotate(' + locationsAngle + 'deg)',
                '-moz-transform': 'rotate(' + locationsAngle + 'deg)',
                '-o-transform': 'rotate(' + locationsAngle + 'deg)',
                '-ms-transform': 'rotate(' + locationsAngle + 'deg)'
            });
            locationsAngle+=180;
            $( '#locations-nav' ).slideUp( 300 );
        }
    });
    $(".programs-section").removeClass("active");
});

$(document).on('load', function () {
    $(document.body).scrollspy('refresh')
});

$('.programs-sidebar').affix({
    offset: {
        top: 266
        , bottom: function () {
            return (this.bottom = $('.footer').outerHeight(true) + 50)
        }
    }
});
$('#programs').scrollspy({
    target: '.programs-sidebar',
    offset: 10
});
function locationStatusMarker (placeId) {
    var $dummyDivHtml = $('#dummyDiv')[0],
        $placeStatus = $('#Place-Status'),
        service = new google.maps.places.PlacesService($dummyDivHtml);

    service.getDetails(placeId, function (place, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            if (place.opening_hours.open_now) {
                $placeStatus.attr({
                    style: 'color:#23D613;font-size: 15px;vertical-align:middle;',
                    title: 'Open Now'
                });
            }
            else {
                $placeStatus.attr({
                    style: 'color:#ed4b43;font-size: 15px;vertical-align:middle;',
                    title: 'Closed Now'
                });
            }
            $placeStatus.tooltip();
        }
    })
}
