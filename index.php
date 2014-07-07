<!DOCTYPE html>
<?php include "components/php/modernizrCheck.php"; ?>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Seishin Martial Arts / Sport Karate Academy</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <?php include "components/php/beginScripts.php"; ?>
</head>
<body id="home">
<?php include "components/php/navbar.php"; ?>

<!--Slide images should be 1280x420-->
<div id="carousel-home" class="carousel slide" data-ride="carousel">

    <!-- Wrapper for slides -->
    <div class="carousel-inner">
        <div class="item active">
<!--            TODO: Maybe move caption up (in main.css)-->
<!--            image from: http://maps.googleapis.com/maps/api/staticmap?size=1280x225&maptype=roadmap\&markers=size:mid&markers=scale:2%7Ccolor:red%7C74+Main+St.+Medway,MA%7C11+S.+Main+St.+Sherborn,MA%7C124+East+Central+St.+Natick,MA%7C159+Linden+St.+Wellesley,+MA%7C333+Winter+St.+Weston,MA&scale=2-->
            <a href="locations.php"><img src="images/carousel_map.png" width="1280" height="225"
                 alt="Map of karate school locations" class="img-responsive" href="locations.php"></a>
            <div class="carousel-caption">
                <h1><span>5 Elite Locations</span></h1>
            </div>
        </div>
        <div class="item">
            <img src="..." alt="..." width="1280" height="225">
            <div class="carousel-caption">
            </div>
        </div>
    </div>

    <!-- Controls -->
    <a class="left carousel-control" href="#carousel-home" role="button" data-slide="prev">
        <span class="glyphicon glyphicon-chevron-left"></span>
    </a>
    <a class="right carousel-control" href="#carousel-home" role="button" data-slide="next">
        <span class="glyphicon glyphicon-chevron-right"></span>
    </a>
</div>

<div class="container">
    <div class="row">
        <div class="col-md-4">
            <h2>Heading</h2>
            <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
            <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
        </div>
        <div class="col-md-4">
            <h2>Heading</h2>
            <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui. </p>
            <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
        </div>
        <div class="col-md-4">
            <h2>Heading</h2>
            <p>Donec sed odio dui. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta felis euismod semper. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus.</p>
            <p><a class="btn btn-default" href="#" role="button">View details &raquo;</a></p>
        </div>
    </div>

    <hr>
    <?php include "components/php/footer.php"; ?>
</div> <!-- /container -->
<?php include "components/php/endScripts.php"; ?>
</body>
</html>
