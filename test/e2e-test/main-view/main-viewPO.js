module.exports = function() {

    return {
        get: get
    };

    function get() {
        browser.get('http://localhost:8080');
    }
};