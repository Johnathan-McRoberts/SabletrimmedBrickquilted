import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { UserLoginRequest } from '../models/user-login-request';
import { UserLoginResponse } from '../models/user-login-response';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoggedInService {
  private http = inject(HttpClient);
  private baseUrl: string = environment.baseUrl;

  private currentUser: UserLoginResponse | null = null;

  public get isLoggedIn(): boolean {
    return this.currentUser !== null;
  }
  public get isNotLoggedIn(): boolean {
    return this.currentUser === null;
  }

  public get loggedInUserName(): string {
    return this.currentUser !== null ? this.currentUser.name : '';
  }

  public get loggedInUserId(): string {
    return this.currentUser !== null ? this.currentUser.userId : '';
  }

  public setLoggedInUser(user: UserLoginResponse): void {
    this.currentUser = user;

    console.log('LoggedInService: setLoggedInUser called with user:', user.name);
    this.editUser(user.name);
    console.log('LoggedInService: user name updated to', user.name);
    console.log('LoggedInService: isNotLoggedIn() = ', this.isNotLoggedIn);
  }

  private userName = new BehaviorSubject<string>('Undefined');
  castUser = this.userName.asObservable();

  editUser(newUserName: string) {
    this.userName.next(newUserName);
  }

  constructor() {}

  getUserLogin(userName: string, userPassword: string): Observable<UserLoginResponse> {
    // set up the request payload
    const request: UserLoginRequest = {
      name: userName,
      password: userPassword,
    };

    //set up the url
    const url: string = '/api/UserLogin/log-in';

    // and the query parameters
    const queryParams: string = '?Name=' + userName + '&Password=' + userPassword;

    // return the observable
    return this.http.get<UserLoginResponse>(this.baseUrl + url + queryParams);
  }
}
