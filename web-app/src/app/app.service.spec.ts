import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { AppService } from './app.service';
import { asyncData, asyncError } from './helpers/testing/async-observable-helpers';

type Token = {
  token: string;
}

describe(AppService.name, () => {
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  let service: AppService;

  //Mocks
  const email = 'test@gmail.com';
  const password = 'test';

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    service = new AppService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it(`#${AppService.prototype.login.name} should return expected token when the server returns success (HttpClient called once)`, (done: DoneFn) => {
    const expectedResponse: Token = {
      token: 'expectedToken'
    };

    httpClientSpy.post.and.returnValue(asyncData(expectedResponse));

    service.login(email, password).subscribe({
      next: response => {
        expect(response)
          .withContext('expected response')
          .toEqual(expectedResponse);
        done();
      },
      error: done.fail
    });

    expect(httpClientSpy.post.calls.count())
      .withContext('one call')
      .toBe(1);
  });

  it(`#${AppService.prototype.login.name} should return an error when the server returns a 401`, (done: DoneFn) => {
    const errorResponse = new HttpErrorResponse({
      error: 'Invalid credentials',
      status: 401,
      statusText: 'Unauthorized',
    });

    httpClientSpy.post.and.returnValue(asyncError(errorResponse));

    service.login(email, password).subscribe({
      next: response => done.fail('expected an error, unauthorized'),
      error: err => {
        expect(err.error).toContain('Invalid credentials');
        done();
      }
    });
  });
});
