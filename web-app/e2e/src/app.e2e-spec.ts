import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display message login when load page', () => {
    page.navigateTo();
    expect(page.getTitleLogin()).toEqual('Faça login');
  });

  it('should be able to provide success notification when login correctly', () => {
    page.navigateTo();
    page.setValueInputById('email', 'arthur.toledo@squadra.com.br');
    page.setValueInputById('password', '123456');
    page.clickButtonById('button-login');

    expect(page.getTextNotification()).toEqual('Logged in successfully');
  })

  it('should be able to provide error notification when login incorrectly', () => {
    page.navigateTo();
    page.setValueInputById('email', 'arthur.toledo@squadra.com.br');
    page.setValueInputById('password', '1234567');
    page.clickButtonById('button-login');

    expect(page.getTextNotification()).toEqual('Error logging in');
  })
});
