import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';



import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs';

import {
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
//import { MatIconModule } from '@angular/material/icon';

import { UserLoginResponseCode } from '../../../shared/models/user-login-response-code';

import { LoggedInService } from './../../../shared/services/logged-in-service';


interface Course {
  description: string;
  courseListIcon: string;
  iconUrl: string;
  longDescription: string;
  url: string;
}

@Component({
  standalone: false,  // this is now required when using NgModule
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {


  private _http = inject(HttpClient);
  private _loggedInService = inject(LoggedInService);
  private _snackBar = inject(MatSnackBar);
  private router = inject(Router);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  protected readonly userNameValue = signal<string>('');
  protected readonly passwordValue = signal<string>('');

  protected onInputUserName(event: Event) {
    this.userNameValue.set((event.target as HTMLInputElement).value);
    console.log("hey I got the user of " + this.userNameValue());
  }

  protected onInputPassword(event: Event) {
    this.passwordValue.set((event.target as HTMLInputElement).value);
    console.log("hey I got the password as " + this.passwordValue());
  }


  submitLogin() {

    console.log("submit login for : u = " + this.userNameValue() + " p = " + this.passwordValue());

    this
      ._loggedInService
      .getUserLogin(
        this.userNameValue(),
        this.passwordValue())
      .subscribe(
        resp => {
          console.log('Updated resp:', JSON.stringify(resp));
          if (resp !== null && resp !== undefined) {

            if (resp.errorCode === UserLoginResponseCode.Success) {
              this.openSnackBar('Login successful!', 'OK');

              this._loggedInService.setLoggedInUser(resp);

              this.router.navigateByUrl('tables');
            }
            else {

              this.openSnackBar('Login failed: ' + resp.failReason, 'OK');
            }
          }
        });
  }


  users: any[] = [];
  loading = false;
  error = '';

  submitHello() {

    console.log("submit login for : u = " + this.userNameValue() + " p = " + this.passwordValue());

    this.loading = true;
    this.error = '';

    this._http.get<any[]>('https://jsonplaceholder.typicode.com/users')
      .subscribe({
        next: (data: any) => {
          console.log('Received data:', JSON.stringify(data));
          this.users = data;
          this.loading = false;
        },
        error: () => { this.error = 'Failed to load users'; this.loading = false; }
      });
  }
}

