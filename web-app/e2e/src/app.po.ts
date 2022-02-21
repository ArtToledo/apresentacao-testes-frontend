import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get(browser.baseUrl);
  }

  getTitleLogin() {
    return element(by.css('app-root .mat-card-title')).getText();
  }

  setValueInputById(id: string, value: any) {
    return element(by.id(id)).sendKeys(value);
  }

  clickButtonById(id: string) {
    return element(by.id(id)).click();
  }

  getTextNotification() {
    return element(by.xpath('//*[@id="cdk-overlay-0"]/snack-bar-container/simple-snack-bar/span')).getText();
  }
}
