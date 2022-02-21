import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { asyncData, asyncError } from './helpers/testing/async-observable-helpers';

type Token = {
  token: string;
}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let service: AppService;

  // Mocks
  const email = 'test@gmail.com';
  const password = 'test123456';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppModule
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(AppService);
  })

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`${AppComponent.prototype.login.name} should call functions with success parameter when a service call returns successfully`, fakeAsync(() => {
    const expectedResponse: Token = { token: 'expectedToken' };
    const spy = spyOn(service, 'login').and.returnValue(asyncData(expectedResponse));

    //@ts-ignore
    spyOn(component, 'openSnackBar').and.callThrough()
    //@ts-ignore
    spyOn(component, 'clearInputs').and.callThrough()
    //@ts-ignore
    spyOn(component, 'setVisibleMessageErrorForm').and.callThrough()

    component.email = email;
    component.password = password;
    fixture.detectChanges();

    component.login();

    tick(1000);

    expect(spy).toHaveBeenCalledWith(email, password);

    //@ts-ignore
    expect(component.openSnackBar).toHaveBeenCalledWith(component.successMessage)
    //@ts-ignore
    expect(component.clearInputs).toHaveBeenCalled()
    //@ts-ignore
    expect(component.setVisibleMessageErrorForm).toHaveBeenCalled()
  }));

  it(`${AppComponent.prototype.login.name} should call functions with error parameter when a service call returns with error`, fakeAsync(() => {
    const errorResponse = new HttpErrorResponse({
      error: 'Invalid credentials',
      status: 401,
      statusText: 'Unauthorized',
    });
    const spy = spyOn(service, 'login').and.returnValue(asyncError(errorResponse));

    //@ts-ignore
    spyOn(component, 'openSnackBar').and.callThrough()
    //@ts-ignore
    spyOn(component, 'clearInputs').and.callThrough()
    //@ts-ignore
    spyOn(component, 'setVisibleMessageErrorForm').and.callThrough()

    component.email = email;
    component.password = password;
    fixture.detectChanges();

    component.login();
    tick(1000);

    expect(spy).toHaveBeenCalledWith(email, password);

    //@ts-ignore
    expect(component.openSnackBar).toHaveBeenCalledWith(component.errorMessage)
    //@ts-ignore
    expect(component.clearInputs).toHaveBeenCalled()
    //@ts-ignore
    expect(component.setVisibleMessageErrorForm).toHaveBeenCalled()
  }));

  it('(D) should display error message when user tries to log in with incorrect data', () => {
    //@ts-ignore
    component.setVisibleMessageErrorForm(true)
    fixture.detectChanges();

    const element: HTMLElement = fixture.nativeElement.querySelector('.message-error');
    expect(element).not.toBeFalse()
    expect(element.innerText).toBe('Verifique suas credenciais e tente novamente')
  })
});
