describe('basketballstat players view', function() {
  it('should have title called Players View', function() {
    browser.get('http://localhost:8080/#/app/home');
    browser.setLocation('app/players');

    expect(browser.getTitle()).toEqual('Players View');
  });

  it('should have title called New Player', function() {
    browser.get('http://localhost:8080/#/app/home');
    browser.setLocation('app/players');

    element(by.css('button[ui-sref="app.players.newPlayer"]')).click();

    expect(browser.getCurrentUrl()).toBe('http://localhost:8080/#/app/players/new');
  });
});