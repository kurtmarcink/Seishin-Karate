var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();
var parallelize = require("concurrent-transform");
var mainBowerFiles = require('main-bower-files');
var fs = require('fs');

// clean the bower vendor folders (don't call directly)
gulp.task('clean-bower', function () {
    return gulp.src(['dev/js/vendor/*', 'dev/css/vendor/*', 'dev/fonts/vendor/*'], {read: false})
        .pipe(plugins.clean());
});

// grab libraries files from bower_components
gulp.task('bower', ['clean-bower'], function() {

    var jsFilter = plugins.filter('**/*.js');
    var cssFilter = plugins.filter('**/*.css');
    var fontFilter = plugins.filter(['**/*.eot', '**/*.woff', '**/*.svg', '**/*.ttf']);

    return gulp.src(mainBowerFiles())

        // grab vendor js files from bower_components, move to appropriate folder in dev
        .pipe(jsFilter)
        .pipe(gulp.dest('dev/js/vendor'))
        .pipe(jsFilter.restore())

        // grab vendor css files from bower_components, move to appropriate folder in dev
        .pipe(cssFilter)
        .pipe(gulp.dest('dev/css/vendor'))
        .pipe(cssFilter.restore())

        // grab vendor font files from bower_components, move to appropriate folder in dev
        .pipe(fontFilter)
        .pipe(plugins.flatten())
        .pipe(gulp.dest('dev/fonts/vendor'))
});

// clean the dist folder
gulp.task('clean-dist', function () {
    return gulp.src('dist/*', {read: false})
        .pipe(plugins.clean());
});

// concat and uglify vendor js, then more to dist
gulp.task('vendor-js', function() {
    return gulp.src(['dev/js/vendor/jasny-bootstrap.js', 'dev/js/vendor/jquery.sticky-kit.js', 'dev/js/vendor/jquery.imageScroll.js', 'dev/js/vendor/mailcheck.js', 'dev/js/vendor/spin.js', 'dev/js/vendor/ladda.min.js', 'dev/js/vendor/smooth-scroll.js'])
        .pipe(plugins.changed('dist/js'))
        .pipe(plugins.concat('vendor.min.js'))
        .pipe(plugins.uglify())
        .pipe(plugins.filesize())
        .pipe(gulp.dest('dist/js'))
});

// concat and uglify custom js, then move to dist
gulp.task('custom-js', function() {
    return gulp.src(['dev/js/custom/main.js', 'dev/js/custom/locationMap.js'])
        .pipe(plugins.changed('dist/js'))
        .pipe(plugins.concat('custom.min.js'))
        .pipe(plugins.uglify())
        .pipe(plugins.filesize())
        .pipe(gulp.dest('dist/js'))
});

// compile less (don't call directly)
gulp.task('less', function() {
    return gulp.src(['./dev/less/non-bower/bootstrap.less', './dev/less/custom/main.less'])
        .pipe(plugins.less())
        .pipe(gulp.dest('./dev/css/vendor'));
});

// autoprefix and combine media queries (don't call directly)
gulp.task('css-cleanup', ['less'], function() {
    return gulp.src('./dev/css/vendor/main.css')
        .pipe(plugins.autoprefixer("last 4 versions", "> 1%", "ie 8", "ie 7"))
        .pipe(plugins.combineMediaQueries())
        .pipe(gulp.dest('./dev/css/vendor'));
});

// concat and minify css, then move to dist
gulp.task('css', ['css-cleanup'], function() {
    return gulp.src(['./dev/css/vendor/bootstrap.css', './dev/css/vendor/main.css', './dev/css/vendor/jasny-bootstrap.css', './dev/css/vendor/ladda-themeless.min.css'])
//        .pipe(plugins.changed('./dist/css'))
        .pipe(plugins.concat('all.min.css'))
        .pipe(plugins.minifyCss({keepSpecialComments:false}))
        .pipe(gulp.dest('./dist/css'));
});


// copy leftover css to dist folder
gulp.task('copy-css', function() {
    return gulp.src(['dev/css/non-bower/social.min.css', 'dev/css/vendor/font-awesome.css'])
//        .pipe(plugins.changed('./dist/css'))
        .pipe(gulp.dest('dist/css'))
});

// copy fonts to dist folder
gulp.task('copy-fonts', function() {
    return gulp.src(['dev/fonts/non-bower/*', 'dev/fonts/vendor/*'])
        .pipe(plugins.changed('./dist/fonts'))
        .pipe(gulp.dest('dist/fonts'))
});

// copy leftover js to dist folder
gulp.task('copy-js', function() {
    return gulp.src(['dev/js/custom/sendContact.js', 'dev/js/custom/sendContactPolyfill.js', 'dev/js/non-bower/**/*', 'dev/js/vendor/bootstrap.min.js', 'dev/js/vendor/jquery.min.js'])
        .pipe(plugins.changed('dist/js'))
        .pipe(gulp.dest('dist/js'))
});

// include html snippets, inject assets, CDN-ize jquery & bootstrap, minify html, move to dist folder
gulp.task('process-html', ['vendor-js', 'custom-js', 'css', 'copy-css', 'copy-fonts', 'copy-js'], function() {
    gulp.src(['./dev/pages/*'])
        .pipe(plugins.changed('./dist'))
        .pipe(plugins.fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(plugins.inject(gulp.src(['./dist/js/jquery.min.js', './dist/js/bootstrap.min.js', './dist/js/vendor.min.js', './dist/css/*.css', './dist/js/custom.min.js'], {read: false}), {ignorePath: "dist"}))
        .pipe(plugins.cdnizer({
                fallbackScript: '<script>function modernizrLoad(u) { Modernizr.load(u);}</script>',
                fallbackTest: '<script>if(!(${ test })) modernizrLoad("${ filepath }");</script>',
                files: [
                    {
                        file: 'js/jquery.min.js',
                        package: 'jQuery',
                        test: 'window.jQuery',
                        cdn: 'google:jquery'
                    },
                    {
                        file: 'js/bootstrap.min.js',
                        package: 'bootstrap',
                        test: '$.fn.modal',
                        cdn: '//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min.js'
                    }
                ]
            }
        ))
        .pipe(plugins.htmlmin({collapseWhitespace: true, removeComments: true, minifyJS: true, minifyCSS: true}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('image-min', function () {
    return gulp.src('./dev/img/*')
        .pipe(plugins.changed('./dist/img'))
        .pipe(plugins.imagemin())
        .pipe(gulp.dest('./dist/img'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    plugins.livereload.listen();
    gulp.watch('dev/less/custom/**/*.less', ['css']);
    gulp.watch('./dev/js/custom/*.js', ['custom-js']);
    gulp.watch(['./dev/pages/*.html', 'dev/snippets/*.html'], ['process-html']);
    gulp.watch('dist/**/*').on('change', plugins.livereload.changed);
});
gulp.on('err', function(err){
    console.log(err);
});

gulp.task('publish', function() {

    var credentials = JSON.parse(fs.readFileSync('aws-credentials.json', 'utf8'));
    var publisher = plugins.awspublish.create(credentials);
    var headers = {
        "Cache-Control": "max-age=630720000, public",
        "Expires": new Date(Date.now() + 63072000000).toUTCString()
    }

    return gulp.src('./dist/**/*')
        .pipe(parallelize(publisher.publish(headers), 50))
        .pipe(publisher.sync())
        .pipe(publisher.cache())
        .pipe(plugins.awspublish.reporter());
});

// if desired, run 'gulp bower' before and 'gulp publish' after
gulp.task('default', ['vendor-js', 'custom-js', 'css', 'copy-css', 'copy-fonts', 'copy-js', 'process-html', 'image-min', 'watch'], function() {
});

