'use strict';

// This is to run test slowly. useful for users to see the flow details
var timeout = 3; // 100;
var origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function() {
  var args = arguments;

  // queue 100ms wait
  origFn.call(browser.driver.controlFlow(), function() {
    return protractor.promise.delayed(timeout);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};


describe('mavrixAgenda', function() {


  it('should automatically redirect to / when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/");
  });


  describe('main', function() {

    beforeEach(function() {
      //browser.get('index.html#/anything');
    });


    it('General app test', function() {
        browser.get('index.html');
        var selectbox = element(by.css( 'div [type=text]'));
        selectbox.click();
        selectbox.sendKeys("test-user\n");

        expect(browser.getLocationAbsUrl()).toMatch("/agenda");
    });

    it('add new contact', function() {
      var showContactBtn = element(by.id("add-contact-btn"));
      showContactBtn.click();


      var input = element(by.model('vm.contact.name'));
      input.sendKeys("test-contact");
      input = element(by.model('vm.contact.lastname'));
      input.sendKeys("test-contact-lastname");
      input = element(by.model('vm.contact.email'));
      input.sendKeys("test-contact@tests");

      element(by.css('div.ui-select-match')).click();
      element(by.css('a.ui-select-choices-row-inner')).click();

      element(by.id("save-contact-btn")).click();

      var contactList = element.all(by.repeater('contact in vm.filteredContacts | filter:vm.mysearch track by contact.email'));
      expect(contactList.count()).toBe(1);
    });

    it('check contact is persisted', function () {
      browser.get('index.html');
      var selectbox = element(by.css( 'div [type=text]'));
      selectbox.click();
      selectbox.sendKeys("test-user\n");
      selectbox.sendKeys(protractor.Key.ARROW_DOWN);
      selectbox.sendKeys(protractor.Key.ENTER);

      expect(browser.getLocationAbsUrl()).toMatch("/agenda");


      var contactList = element.all(by.repeater('contact in vm.filteredContacts | filter:vm.mysearch track by contact.email'));
      expect(contactList.count()).toBe(1);
    });

    it('check contact is removed', function() {
      var contactList = element.all(by.repeater('contact in vm.filteredContacts | filter:vm.mysearch track by contact.email'));
      expect(contactList.count()).toBe(1);

      element(by.id("remove-contact-btn")).click();
      browser.switchTo().alert().accept();
      var contactList = element.all(by.repeater('contact in vm.filteredContacts | filter:vm.mysearch track by contact.email'));
      expect(contactList.count()).toBe(0);

      // Finally delete agenda.
      element(by.id("delete-agenda-btn")).click();
      browser.switchTo().alert().accept();
    });

  });


});
