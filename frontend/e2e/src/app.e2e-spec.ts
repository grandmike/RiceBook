import { AppPage } from './app.po';
import { browser, by, element } from 'protractor';
const webdriver = require('selenium-webdriver')
describe('hw6 front-end e2e testing', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should register a user', () => {
    page.navigateTo(browser.baseUrl +/#/);
    page.register().then(() => {
      let info = element(by.id('registration_hint'));
      expect(info.getText()).toEqual('Register Success!');
    });
  });

  it('should login as new user', () => {
    page.navigateTo(browser.baseUrl +'/#/auth');
    page.login('qs12', '1234').then(() => {
      let info = element(by.id('login_hint'));
      expect(info.getText()).toEqual('Login in success!');
    });
  });

  it('create a new article and validate', () => {
    page.navigateTo(browser.baseUrl +'/#/main');
    page.addaAarticle('for e2e test').then(()=>{
      let info = element(by.id('article_hint'));
      expect(info.getText()).toEqual('Post success!');

      let newadd = element.all(by.name('all_posts')).get(0).element(by.name('article_text'));
      expect(newadd.getText()).toEqual('for e2e test');
    });
  });

  it('update headline and verify change', () => {
    page.navigateTo(browser.baseUrl +'/#/main');
    page.updateStatus('I\'m testing now!').then(()=>{
      let info = element(by.id('headline_hint'));
      expect(info.getText()).toEqual('Update Success!');
      let status = element(by.name('NowStatus'));
      expect(status.getText()).toEqual('I\'m testing now!');
    });
  });


  it('log out as new user', () => {
    page.navigateTo(browser.baseUrl +'/#/main');
    page.logout().then(()=>{
      console.log(browser.getCurrentUrl());
      expect(element(by.id('tool_bar')).getText()).toEqual('Rice Book');
    });
  });

  it('should login as test user', () => {
    page.navigateTo(browser.baseUrl +'/#/auth');
    page.login('qs8', '1234').then(() => {
      let info = element(by.id('login_hint'));
      expect(info.getText()).toEqual('Login in success!');
    });
  });

  it('search for a keyword that matches only one of test articles and verify', () => {
    page.navigateTo(browser.baseUrl +'/#/main');
    page.search('for test').then(() => {
       element.all(by.name('all_posts')).then(function (items) {
         expect(items.length).toBe(1);
      });
      let text = element.all(by.name('all_posts')).get(0).element(by.name('article_text'));
      let author = element.all(by.name('all_posts')).get(0).element(by.name('author_info'));
      expect(text.getText()).toEqual('for test');
      expect(author.getText()).toEqual('Created by: gm1 netId: qs8');
    });
  });

  it('log out as test user', () => {
    page.navigateTo(browser.baseUrl +'/#/main');
    page.logout().then(()=>{
      expect(element(by.id('tool_bar')).getText()).toEqual('Rice Book');
    });
  });


});