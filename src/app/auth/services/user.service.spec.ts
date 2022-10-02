import {TestBed} from "@angular/core/testing";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {UserService} from "./user.service";
import {AuthService} from "./auth.service";
import {lastValueFrom, of} from "rxjs";

describe('UserService', () => {
  let userService: UserService;
  let authService: AuthService;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    userService = TestBed.inject(UserService);
    authService = TestBed.inject(AuthService);
    http = TestBed.inject(HttpClient);
  });

  it('should create', () => {
    expect(userService).toBeTruthy();
  });

  it('should register user and log in the user after registration', async () => {
    const response = {accessToken: 'token', user: {id: 1}};
    jest.spyOn(http, 'post').mockReturnValue(of(response));

    await userService.register({} as any);

    expect(authService.isAuthorized()).toBeTruthy();
  });

  it('should return user data', async () => {
    const user = {id: 1};
    jest.spyOn(authService, 'getUserId').mockImplementation(() => 1);
    jest.spyOn(http, 'get').mockReturnValue(of(user));

    const res = await lastValueFrom(userService.get());

    expect(res).toBe(user);
  });
});
