import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { LoggedInService } from './../../../shared/services/logged-in-service';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.html',
  styleUrls: ['./main-toolbar.scss'],
  standalone: false
})
export class MainToolbar {

  private router = inject(Router);
  private loggedInService = inject(LoggedInService);

  public isNotLoggedIn(): boolean {
    return !this.loggedInService.isLoggedIn;
  }

  public get displayuser(): string {
    return this.loggedInService.isLoggedIn ? ': ' + this.loggedInService.loggedInUserName : '';

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
