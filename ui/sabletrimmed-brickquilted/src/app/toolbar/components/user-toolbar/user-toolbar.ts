import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { LoggedInService } from './../../../shared/services/logged-in-service';

@Component({
  standalone: false, // this is now required when using NgModule
  selector: 'app-user-toolbar',
  templateUrl: './user-toolbar.html',
  styleUrl: './user-toolbar.scss',
})
export class UserToolbar implements OnInit {
  //private router = inject(Router);

  private loggedInService = inject(LoggedInService);
  public user: string = '';

  //public get displayUser(): string {
  //  return this.user ? this.user : 'Guest';
  //}

  //public get isNotLoggedIn(): boolean {
  //  return this.user.length === 0 || this.user === 'Undefined';
  //}

  ngOnInit() {
    this.loggedInService.castUser.subscribe((data) => {
      console.log('UserToolbar: user name changed to', data);
      this.user = data;
    });
  }

  //navigateToLogin() {
  //  // Standard navigation
  //  this.router.navigate(['/login']);
  //}

  //navigateToUsers() {
  //  // Standard navigation
  //  this.router.navigate(['/users']);
  //}
  //navigateToCharts() {
  //  // Standard navigation
  //  this.router.navigate(['/charts']);
  //}
  //navigateToTables() {
  //  // Standard navigation
  //  this.router.navigate(['/tables']);
  //}
  //navigateToForms() {
  //  // Standard navigation
  //  this.router.navigate(['/forms']);
  //}
  //navigateToInputExport() {
  //  // Standard navigation
  //  this.router.navigate(['/import-export']);
  //}
}
