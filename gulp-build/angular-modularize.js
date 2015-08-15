var log = require('gulp-util').log;
var chalk = require( 'chalk' );
var exports = module.exports = {};

exports.logFilePath = logFilePath;
exports.injectModule = injectModule;

function logFilePath(es) {
    return es.map(function(file, cb) {
        log(file.path);
        return cb(null, file);
    });
}

function injectModule(es, opt) {
    return es.map(function(file, cb) {
        var regex = /angular\.module\(\'([\S]+)\'\)/g;
        var content = String(file.contents);
        try {
            var firstMatch = regex.exec(content)[0];
            file.contents = new Buffer(addTryCatch(firstMatch) + content);
        } catch (e) {
            log(chalk.red(e));
            log(chalk.cyan('No match found for regex: ' + regex + ' in: ' + file.path));
        }
        return cb(null, file);
    });
}

function addTryCatch(match) {
    return 'try { ' + match + ' } ' +
    'catch (e) { ' + match.slice(0, match.length-1) + ', []);' +
    '}\n';
}