$(function() {
    $("#about a:contains('About')").parent().addClass('active');
    $("#history a:contains('History')").parent().parent().parent().addClass('active').parent().addClass('active');
    $("#locations a:contains('Locations')").parent().parent().parent().addClass('active');
    $("#staff a:contains('Staff')").parent().parent().parent().addClass('active');
    $("#tournaments a:contains('Tournaments')").parent().parent().parent().addClass('active');
    $("#programs a:contains('Programs')").parent().addClass('active');
    $("#social a:contains('Social')").parent().addClass('active');
    $("#contact a:contains('Contact Us')").parent().addClass('active');

    $.get(http://api.yelp.com/v2/business/seishin-martial-arts-sport-karate-academy-medway)
})