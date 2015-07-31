describe('basketballstat main view', function() {
  it('should have title called Main View', function() {
    browser.get('http://localhost:8080/index.html');

    expect(browser.getTitle()).toEqual('Main View');
  });
});