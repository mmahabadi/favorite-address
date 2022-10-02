import {Injectable, OnDestroy, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom, map, Observable, of, ReplaySubject, tap} from "rxjs";
import {UserCredential} from "../models/user-credential";
import {UserCredentialResponse} from "../models/user-credential-response";

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy{
  private TOKEN_NAME = 'token';
  private USER_ID = 'user_id';
  private isLoggedInSource$ = new ReplaySubject<boolean>(1);
  isLoggedIn$ = this.isLoggedInSource$.asObservable();

  constructor(private http: HttpClient) {
    this.isLoggedInSource$.next(this.isAuthorized());
  }

  ngOnDestroy() {
    this.isLoggedInSource$.complete();
  }

  async login(credential: UserCredential): Promise<void>{
    try {
      const request$ = this.http.post<UserCredentialResponse>('/api/login', credential);
      const res = await lastValueFrom(request$);
      this.signIn(res);
      return Promise.resolve();
    } catch (e) {
      return Promise.reject(e);
    }
  }

  signIn(credential: UserCredentialResponse){
    localStorage.setItem(this.TOKEN_NAME, credential.accessToken);
    localStorage.setItem(this.USER_ID, credential.user.id + '');
    this.isLoggedInSource$.next(true);
  }

  logout(): void{
    // if we had API to logout it should be called
    localStorage.removeItem(this.TOKEN_NAME);
    this.isLoggedInSource$.next(false);
  }

  isAuthorized(): boolean{
    return !!localStorage.getItem(this.TOKEN_NAME);
  }

  getUserId(): number{
    const userId = localStorage.getItem(this.USER_ID) || 0;
    return +userId;
  }

  getToken() {
    return localStorage.getItem(this.TOKEN_NAME);
  }
}
