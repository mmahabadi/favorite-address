import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom, Observable} from "rxjs";
import {User} from "../models/user";
import {UserCredential} from "../models/user-credential";
import {UserCredentialResponse} from "../models/user-credential-response";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService{

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  async register(entry: User): Promise<void>{
    try {
      const request$ = this.http.post<UserCredentialResponse>('/api/register', entry);
      const res = await lastValueFrom(request$);
      this.authService.signIn(res);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async edit(entry: User): Promise<void>{
    try {
      const request$ = this.http.patch<UserCredentialResponse>(`/api/users/${entry.id}`, entry);
      await lastValueFrom(request$);
      return Promise.resolve();
    } catch (err) {
      return Promise.reject(err);
    }
  }

  get(): Observable<User> {
    const userId = this.authService.getUserId();
    return this.http.get<User>(`/api/users/${userId}`);
  }
}
