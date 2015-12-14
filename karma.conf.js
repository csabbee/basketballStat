// Karma configuration
// Generated on Sun Jul 05 2015 09:52:45 GMT+0200 (Central Europe Daylight Time)

module.exports = function(config) {
    config.set({
        // karma plugins: install plugins globally
        plugins: [
            'karma-jasmine',
            'karma-babel-preprocessor',
            'karma-chrome-launcher',
            'karma-ie-launcher',
            'karma-phantomjs-launcher',
            require('./karma-test-framework/karma-ng-module-preprocessor')
        ],

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files /ww patterns to load in the browser
        files: [
            'node_modules/es5-shim/es5-shim.js',
            'node_modules/es6-shim/es6-shim.js',
            'www/lib/underscore/underscore-min.js',
            'www/lib/pouchdb/dist/pouchdb.js',
            'www/lib/ionic/js/ionic.bundle.js',
            'www/lib/angular-ui-router/release/angular-ui-router.js',
            'www/lib/ngCordova/dist/ng-cordova.js',
            'www/lib/ngCordova/dist/ng-cordova-mocks.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'www/js/app.js',
            'appSrc/**/*.js',
            'www/js/htmlcache.js',
            'test/unit-test/**/*Spec.js'
        ],


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'appSrc/**/*.js': ['babel', 'ng-modularize'],
            'test/**/*.js': ['babel']
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: [
            // 'Chrome',
            //'IE',
            'PhantomJS'
        ],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false
    })
}
