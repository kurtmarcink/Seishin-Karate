<!DOCTYPE html>
<?php include "components/php/modernizrCheck.php"; ?>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Contact Us - Seishin Martial Arts / Sport Karate Academy</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <?php include "components/php/beginScripts.php"; ?>
</head>
<body id="contact">
<?php include "components/php/navbar.php"; ?>
<div class="container">
    <h1>Contact Us</h1>
    <hr>
    <div class="row">
        <div class="col-md-4">
            <div class="well well-lg">
<!--                TODO: add dropdown that dynamically adds in location information-->
            <h3>Locations</h3>
            <table class="table table-striped">
                <tr>
                    <td rowspan="2">Medway</td>
                    <td>74 Main St. Medway, MA 02053</td>
                </tr>
                <tr>
                    <td><a href="tel:+15085331501">(508) 533-1501</a></td>
                </tr>
                <tr>
                    <td rowspan="2">Natick</td>
                    <td>124 East Central St. Natick, MA 01760 </td>
                </tr>
                <tr>
                    <td><a href="tel:+15084330901">(508) 433-0901</a></td>
                </tr>
                <tr>
                    <td rowspan="2">Sherborn</td>
                    <td>11 S Main St. Sherborn, MA 01770 </td>
                </tr>
                <tr>
                    <td><a href="tel:+15084330901">(508) 433-0901</a></td>
                </tr>
                <tr>
                    <td rowspan="2">Wellesley</td>
                    <td>159 Linden St. Wellesley, MA. 02482</td>
                </tr>
                <tr>
                    <td><a href="tel:+15083191775">(508) 319-1775</a></td>
                </tr>
                <tr>
                    <td rowspan="2">Weston</td>
                    <td>333 Winter St. Weston, MA. 02493</td>
                </tr>
                <tr>
                    <td><a href="tel:+15083191775">(508) 319-1775</a></td>
                </tr>
            </table>
            </div>
        </div>
        <div class="col-md-8">
            <h3>Contact Form</h3>
            <form role="form">
                <div class="form-group">
                    <label for="name" class="control-label">Name</label>
                    <div class="input-group">
                        <div class="input-group-addon"><span class="glyphicon glyphicon-user"></span></div>
                        <input type="text" class="form-control" id="name" placeholder="Enter Name" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="email" class="control-label">Email Address</label>
                    <div class="input-group">
                        <div class="input-group-addon"><span class="glyphicon glyphicon-envelope"></span></div>
                        <input type="email" class="form-control" id="email" placeholder="Enter Email" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="phone">Phone</label>
                    <div class="input-group">
                        <div class="input-group-addon"><span class="glyphicon glyphicon-phone"></span></div>
                        <input type="tel" class="form-control" id="phone" placeholder="Enter Phone Number" required>
                    </div>
                </div>
                <div class="form-group">
                    <label for="message" class="control-label">Message</label>
                    <div class="input-group">
                        <div class="input-group-addon"><span class="glyphicon glyphicon-edit"></span></div>
                        <textarea class="form-control" id="message" placeholder="Enter Message" cols="200" rows="3" required></textarea>
                    </div>
                </div>
                <button type="submit" class="btn btn-default">Submit</button>
            </form>
        </div>
    </div>
    <div class="clearfix"></div>
    <?php include "components/php/footer.php"; ?>
</div> <!-- /container -->
<?php include "components/php/endScripts.php"; ?>
</body>
</html>