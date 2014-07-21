'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        aws: grunt.file.readJSON('grunt-aws.json'),
        shell: {
            build: {
                command: 'sh build.sh'
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'build-package/js/main.js',
                'build-package/js/plugins.js'
            ]
        },
        clean: ["dist"],
        uglify: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'build-package/js',
                    src: '**/*.js',
                    dest: 'dist/js'
                }]
            }
        },
        less: {
            options: {
                paths: ["build-package/less"]
            },
            files: {
                expand: true,
                cwd: 'build-package/less',
                src: ['bootstrap.less', 'main.less'],
                dest: 'build-package/css',
                ext: '.css'
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 4 versions']
            },
            dist: {
                files: {
                    'build-package/css/main.css': 'build-package/css/main.css'
                }
            }
        },
        csslint: {
            lax: {
                options: {
                    "qualified-headings": false,
                    "important": false
                },
                expand: true,
                cwd: 'build-package',
                src: ['css/*.css', '!css/bootstrap.css', '!css/vendor/*']
            }
        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'build-package/css',
                src: ['*.css', '!vendor/*'],
                dest: 'dist/css/'
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'build-package/images',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'dist/images'
                }]
            }
        },
        copy: {
            css: {
                files: [
                    {expand: true, flatten: true, src: ['build-package/css/vendor/*'], dest: 'dist/css/vendor', filter: 'isFile'},
                ]
            },
            fonts: {
                files: [
                    {expand: true, flatten: true, src: ['build-package/fonts/*'], dest: 'dist/fonts', filter: 'isFile'}
                ]
            }
        },
        modernizr: {
            dist: {
                "devFile" : "build-package/js/modernizr.js",
                "outputFile" : "dist/js/modernizr.js",

                "extra" : {
                    "shiv" : true,
                    "printshiv" : false,
                    "load" : true,
                    "mq" : false,
                    "cssclasses" : true
                },
                "extensibility" : {
                    "addtest" : false,
                    "prefixed" : false,
                    "teststyles" : false,
                    "testprops" : false,
                    "testallprops" : false,
                    "hasevents" : false,
                    "prefixes" : false,
                    "domprefixes" : false
                },
                "parseFiles" : true,
                "matchCommunityTests" : false,
                "files": {
                    src: ['build-package/**']
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    minifyJS: true,
                    minifyCSS: true
                },
                files: [{
                    expand: true,
                    cwd: 'build-package',
                    src: ['*.html'],
                    dest: 'dist'
                }]
            }
        },
        s3: {
            options: {
                key: '<%= aws.key %>',
                secret: '<%= aws.secret %>',
                bucket: '<%= aws.bucket %>',
                access: 'public-read',
                headers: {
                    // Two Year cache policy (1000 * 60 * 60 * 24 * 730)
                    "Cache-Control": "max-age=630720000, public",
                    "Expires": new Date(Date.now() + 63072000000).toUTCString()
                }
            },
            dev: {
                // These options override the defaults
                options: {
                    maxOperations: 20
                },
                sync: [
                    {
                        src: 'dist/**/*.*',
                        dest: '.',
                        rel: 'dist',
                        options: {
                            gzip: true,
                            gzipExclude: ['.jpg', '.jpeg', '.png'],
                            verify: true
                        }
                    }
                ]
            }
        },
        concurrent: {
            beg: ['shell', 'clean'],
            middle: ['css', 'copy:fonts', 'newer:uglify', 'imagemin'],
            end: ['modernizr', 'htmlmin']
        }
    });

    grunt.registerTask('css', [
        'newer:less',
        'newer:autoprefixer',
        'newer:csslint:lax',
        'newer:cssmin',
        'copy:css'
    ]);

    // Default task(s).
    grunt.registerTask('default', [
        'concurrent:beg',
        'newer:jshint',
        'concurrent:middle',
        'concurrent:end'
    ]);

    grunt.registerTask('upload', [
        'default',
        's3'
    ]);
};