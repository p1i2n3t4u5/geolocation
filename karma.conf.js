//jshint strict: false
module.exports = function(config) {
    config.set({

        //basePath: './app',
        basePath: '',

        // files: [
        //     'bower_components/angular/angular.js',
        //     'bower_components/angular-route/angular-route.js',
        //     'bower_components/angular-mocks/angular-mocks.js',
        //     'components/**/*.js',
        //     'view*/**/*.js'
        // ],

        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-route/angular-route.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/*.js',
            'app/controllers/*.js',
            'test/*.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        // browsers: ['Chrome'],
        browsers: ['ChromeDebugging'],

        customLaunchers: {
            ChromeDebugging: {
                base: 'Chrome',
                flags: ['--remote-debugging-port-9333']
            }
        },

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};