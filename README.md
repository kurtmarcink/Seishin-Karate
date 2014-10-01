Seishin-Karate
=========================

A (incomplete) POC for a martial arts website.

## How to install

    npm install
    bower install

## Getting started
#### Project Structure
Navigate to the `dev/` folder in this repository, and you will see a familiar project structure. Inside folder `css/`, `fonts/`, `js/`, and `less/` you will see folders `custom/`, `non-bower/`, and `vendor/`. `custom/` is for project-specific code. `non-bower/` is for libraries and plugins that are either not on bower or that I have customized. `vendor/` are all of the bower-managed files... these should not be touched.

#### LESS/CSS
This is a Twitter Bootstrap Application. To change the styling of the site, navigate to the `less/` folder in `dev/`. Everything under `non-bower/` is Bootstrap (consult this folder first when making a change), everything other `custom` is unique to the project. Edit the individual files under `modules`. `main.less` just inherits from the files in that directory.

#### JS
All of the javascript is under `js/`. `main.js` includes smaller page-agnostic javascript features, the others include larger, page-specific features. Everything is concatenated and minified for deployment... this is just for organizational purposes in development.

#### HTML
HTML is managed in two directories, `pages/` and `snippets/`. `pages/` include the different site pages. `snippets/` are code snippets to be included on multiple pages, like the navbar, footer, etc. These are injected into the pages when Gulp builds the project.

#### Build/Deployment
Project building and deployment is handled by Gulp. Navigate to the file `Gulpfile.js` in the top-level directory and follow the comments in the file to build/deploy. The contents of the `dev` folder is built into the folder `dist`. To deploy to the AWS S3 bucket, you need a file `aws-credentials.json` that contains the creds for the bucket. This file is not under version control for security purposes.

## Technologies
* jQuery
* Twitter Bootstrap
* HTML5 Boilerplate
* Modernizr
* Gulp.js
* NPM
* Bower
* Google Maps JS API
* Mandrill
* Miscellaneous libraries and plugins (consult `bower_components/`)
