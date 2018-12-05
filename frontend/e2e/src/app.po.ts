import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo(path) {
    return browser.get(path);
  }

  getParagraphText() {
    return element(by.css('app-root h1')).getText();
  }

  login(input_id, input_password) {
    let netid = element(by.id("login_id"));
    netid.sendKeys(input_id);
    let password = element(by.id("login_password"));
    password.sendKeys(input_password);
    let loginbtn = element(by.id("loginbtn"));
    return loginbtn.click();
  }

  register() {
    let netid = element(by.id('register_id'));
    let passowrd = element(by.id('register_password'));
    let confirm_password = element(by.name('_password_confirm'));
    let username = element(by.name('_username'));
    let email = element(by.name('_email'));
    let zipcode = element(by.name('_zipcode'));
    let phone  = element(by.name('_phone'));
    let birth = element(by.name('_birth'));
    netid.sendKeys('qs12');
    passowrd.sendKeys('1234');
    confirm_password.sendKeys('1234');
    username.sendKeys('gm5');
    email.sendKeys('sun@gmail.com');
    zipcode.sendKeys('12345');
    phone.sendKeys('123-123-1234');
    birth.sendKeys('01011996');
    let regbtn = element(by.id("regbtn"));
    return regbtn.click();
  }

  addaAarticle(article_text) {
    let article = element(by.id('article_text'));
    article.sendKeys(article_text);
    let btn = element(by.id('addbtn'));
    return btn.click();
  }

  updateStatus(status_text) {
    let status = element(by.name('NewStatus'));
    status.sendKeys(status_text);
    let btn = element(by.id('headlinebtn'));
    return btn.click();
  }
  logout() {
    let btn = element(by.id('logoutbtn'));
    return btn.click();
  }

  search(keyword) {
    let input = element(by.name('search_keyword'));
    input.sendKeys(keyword);
    let btn = element(by.name('search_btn'));
    return btn.click();
  }
}
