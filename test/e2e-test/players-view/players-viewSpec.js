describe('basketballstat players view', function() {
  it('should have title called Players View', function() {
    browser.get('http://localhost:8080/#/app/home');
    browser.setLocation('app/players');

    expect(browser.getTitle()).toEqual('Players View');
  });
});