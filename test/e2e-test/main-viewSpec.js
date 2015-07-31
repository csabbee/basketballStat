describe('basketballstat main view', function() {
  it('should have title called Main View', function() {
    browser.get('http://localhost:8080/index.html');

    //element(by.model('todoList.todoText')).sendKeys('write first protractor test');
    //element(by.css('[value="add"]')).click();

    //var todoList = element.all(by.repeater('todo in todoList.todos'));
    //expect(todoList.count()).toEqual(3);
    //expect(todoList.get(2).getText()).toEqual('write first protractor test');

    // You wrote your first test, cross it off the list
    //todoList.get(2).element(by.css('input')).click();
    //var completedAmount = element.all(by.css('.done-true'));
    //expect(completedAmount.count()).toEqual(2);
    expect(browser.getTitle()).toEqual('Main View');
  });
});