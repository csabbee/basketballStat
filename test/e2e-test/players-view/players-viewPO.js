module.exports = function() {
    
    return {
        get: get
    }

    function get() {
        browser.get('http://localhost:8080/#/app/home');
        browser.setLocation('app/players');
    }
}