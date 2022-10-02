import {TestBed} from "@angular/core/testing";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {lastValueFrom, of, throwError} from "rxjs";

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(AuthService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
    expect(service.isAuthorized()).toBeFalsy();
  });

  it('should sign in the user and set localstorage when user login',  (done) => {
    const response = {accessToken: 'token', user: {id: 1}};
    const http = TestBed.inject(HttpClient);
    jest.spyOn(http, 'post').mockReturnValue(of(response));

    service.login({} as any);

    service.isLoggedIn$.subscribe(res => {
      expect(service.isAuthorized()).toBeTruthy();
      expect(res).toBeTruthy();
      expect(service.getUserId()).toBe(1);
      expect(service.getToken()).toBe('token');
      done()
    })
  });

  it('should sign out the user when user log out',  async () => {
    const user = {accessToken: 'token', user: {id: 1}};
    const http = TestBed.inject(HttpClient);
    jest.spyOn(http, 'post').mockReturnValue(of(user));

    await service.login({} as any);
    await service.logout();

    expect(service.isAuthorized()).toBeFalsy();
  });
})
