/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
var gulp = require('gulp');

// Include Gulp & plugins
var gulp           = require('gulp');
var mainBowerFiles = require('gulp-main-bower-files');
var addSrc         = require('gulp-add-src');  
var order          = require('gulp-order');
var concat         = require('gulp-concat');
var filter         = require('gulp-filter');
var uglify         = require('gulp-uglify');
var cleanCSS       = require('gulp-clean-css');

// Settings
var dest = 'www/bower_components/';

var bowerOptions = {overrides: {
	'bootstrap': {main: [
		'dist/js/bootstrap.js',
		'dist/css/bootstrap.css',
		'dist/css/bootstrap-theme.css',
	]},
	'jquery-ui': {main: [
		'jquery-ui.js',
		'themes/base/all.css',
    ]},
    
}};


const myfilter = filter(['**', '!*src/vendor'], {restore: true});

// Tasks
gulp.task('css', function() {
	gulp.src('./bower.json')
		.pipe(mainBowerFiles(bowerOptions))
        // .pipe(filter('**/*.css'))
        .pipe(filter('**/*.css'))
		.pipe(cleanCSS({rebaseTo: dest}))
		.pipe(concat('all.min.css'))
		.pipe(gulp.dest(dest));
});

gulp.task('js', function() {
	gulp.src('./bower.json')
		.pipe(mainBowerFiles(bowerOptions))
		.pipe(filter('**/*.js'))
		.pipe(order([
			'**/jquery/dist/jquery.js',
			'**/nette.ajax.js',
			'**/*',
		]))
		.pipe(uglify())
		.pipe(concat('all.min.js'))
		.pipe(gulp.dest(dest));
});


gulp.task('css2', function() {
	gulp.src([
        "app/bower_components/html5-boilerplate/dist/css/normalize.css",
        "app/bower_components/html5-boilerplate/dist/css/main.css",
        "app/app.css",
        "app/bower_components/bootstrap/dist/css/bootstrap.css",
        "app/bower_components/bootstrap/dist/css/bootstrap-theme.css"
    ])
		.pipe(concat('all.min.css'))
		.pipe(gulp.dest(dest));
});


gulp.task('js2', function() {
	gulp.src([
        "app/bower_components/jquery/dist/jquery.js",
        "app/bower_components/html5-boilerplate/dist/js/vendor/modernizr-2.8.3.min.js",
        "app/bower_components/angular/angular.js",
        "app/bower_components/angular-route/angular-route.js",
		"app/bower_components/angular-resource/angular-resource.js",
		"app/bower_components/angular-flash-alert/dist/angular-flash.js",
		"app/bower_components/angular-auto-validate/dist/jcs-auto-validate.js",
		"app/bower_components/bootstrap/dist/js/bootstrap.js",
		"app/bower_components/angular-ui-router/release/angular-ui-router.js",
		"app/bower_components/angular-recaptcha/release/angular-recaptcha.js",
		"app/bower_components/angular-ui-router/release/angular-ui-router.js",
		// "app/bower_components/app.js",
		// "app/bower_components/controllers/HomeController.js",
		// "app/bower_components/controllers/LoginController.js",
		// "app/bower_components/controllers/LoginRegisterController.js",
		// "app/bower_components/controllers/RegisterController.js",
		// "app/bower_components/services/UserService.js",
		// "app/bower_components/services/LoginService.js",
		// "app/bower_components/services/Config.js",
		"app/bower_components/components/version/version.js",
		"app/bower_components/components/version/version-directive.js",
		"app/bower_components/components/version/interpolate-filter.js",		 
    ])
		
		.pipe(concat('all.min.js'))
		.pipe(gulp.dest(dest));
});


gulp.task('default', ['js', 'css']);
gulp.task('default2', ['js2', 'css2']);

