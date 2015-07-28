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

        try {
            var regex = /angular\.module\(\'([\S]+)\'\)/g;
            var fileContent = String(content);
            var firstMatch = regex.exec(fileContent)[0];
            var processed = new Buffer(addTryCatch(firstMatch) + fileContent);
            return done(null, processed);
        } catch(err) {
            log.error('%s\n at %s', err.message, file.originalPath);
            done(err, null);
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