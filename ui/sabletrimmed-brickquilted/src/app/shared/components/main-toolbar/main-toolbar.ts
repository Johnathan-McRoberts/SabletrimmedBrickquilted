import { Component, inject, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { LoggedInService } from './../../../shared/services/logged-in-service';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.html',
  styleUrls: ['./main-toolbar.scss'],
  standalone: false,
})
export class MainToolbar implements OnInit {
  private router = inject(Router);
  private loggedInService = inject(LoggedInService);
  //private readonly destroyRef = inject(DestroyRef);

  public get isNotLoggedIn(): boolean {
    //return false;
    return !this.user || this.user.length === 0;
  }
  public get isLoggedIn(): boolean {
    return !this.isNotLoggedIn;
  }

  public get displayUser(): string {
    return this.isLoggedIn ? ': ' + this.user : '';
  }

  public user = '';

  public loggedInCallbackType = (newUserName: string) => {
    console.log('MainToolbar: callback user event happened', newUserName);

    if (newUserName && newUserName.length > 0) {
      console.log('MainToolbar: callback user name changed to', newUserName);
      this.user = newUserName;
      console.log('MainToolbar: displayUser:', this.displayUser);
    }
   }


  ngOnInit() {
    console.log('MainToolbar: registering for the callback');
    this.loggedInService.registerLoggedInCallback(this.loggedInCallbackType);
  }

  navigateToLogin() {
    // Standard navigation
    this.router.navigate(['/login']);
  }

  navigateToUsers() {
    // Standard navigation
    this.router.navigate(['/users']);
  }
  navigateToCharts() {
    // Standard navigation
    this.router.navigate(['/charts']);
  }
  navigateToTables() {
    // Standard navigation
    this.router.navigate(['/tables']);
  }
  navigateToForms() {
    // Standard navigation
    this.router.navigate(['/forms']);
  }
  navigateToInputExport() {
    // Standard navigation
    this.router.navigate(['/import-export']);
  }
}
