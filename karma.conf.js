// Karma configuration
// Generated on Sun Jul 05 2015 09:52:45 GMT+0200 (Central Europe Daylight Time)

module.exports = function(config) {
    config.set({
        // karma plugins: install plugins globally
        plugins: [
            'karma-typescript-preprocessor2',
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-ie-launcher',
            'karma-phantomjs-launcher'
        ],

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files /ww patterns to load in the browser
        files: [
            'node_modules/es6-shim/es6-shim.js',
            'app/**/*.ts',
            'test/unit-test/**/*Spec.ts'
        ],


        // list of files to exclude
        exclude: [
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'app/**/*.ts': ['typescript'],
            'test/unit-test/**/*Spec.ts': ['typescript']
        },

        typescriptPreprocessor: {
            // options passed to typescript compiler
            tsconfigPath: './tsconfig.json', // *obligatory
            compilerOptions: { // *optional
                removeComments: false
            },
            // transforming the filenames
            // you can pass more than one, they will be execute in order
            transformPath: [function(path) { // *optional
                //return path.replace(/\.ts$/, '.js');
                return path;
            }, function(path) {
                //return path.replace(/[\/\\]test[\/\\]/i, '/'); // remove directory test and change to /
                return path;
            }]
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
};
