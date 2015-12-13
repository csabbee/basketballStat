'use strict';

/**
 *
 * @param logger {Object} - Karma's logger.
 * @param helper {Object} - Karma's helper functions.
 */
function createPreprocessor(logger, helper) {
    var log = logger.create('preprocessor.ng-modularize');

    function preprocess(content, file, done) {
        log.debug('Processing "%s".', file.originalPath);
        var regex = /angular\.module\('[\S]+'\)/g;

        try {
            var fileContent = String(content);
            var firstMatch = regex.exec(fileContent)[0];
            var processed = new Buffer(addTryCatch(firstMatch) + fileContent);
            return done(null, processed);
        } catch(err) {
            log.info('no match for: %s in file: %s', regex, file.originalPath);
            log.error('%s\n at %s', err.message, file.originalPath);
            done(null, new Buffer(String(content)));
            // we are not going to break the test running if no match found
            //done(err, null);
        }
    }
    return preprocess;
}


function addTryCatch(match) {
    return 'try { ' + match + ' } ' +
        'catch (e) { ' + match.slice(0, match.length-1) + ', []);' +
        '}\n';
}

createPreprocessor.$inject = ['logger', 'helper'];

module.exports = {
    'preprocessor:ng-modularize': ['factory', createPreprocessor]
};