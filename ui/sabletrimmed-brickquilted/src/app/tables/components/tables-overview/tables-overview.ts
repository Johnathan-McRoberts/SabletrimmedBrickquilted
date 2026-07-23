import { Component, OnInit, inject } from '@angular/core';
import { LoggedInService } from './../../../shared/services/logged-in-service';

import { BookTallies } from './../book-tallies/book-tallies';
import { Authors } from './../authors/authors';
import { ReadBooks } from './../read-books/read-books';

@Component({
  standalone: false, // this is now required when using NgModule
  selector: 'app-tables-overview',
  templateUrl: './tables-overview.html',
  styleUrl: './tables-overview.scss',
})
export class TablesOverview implements OnInit {
  //private router = inject(Router);

  private loggedInService = inject(LoggedInService);
  public user = '';

  //public get displayUser(): string {
  //  return this.user ? this.user : 'Guest';
  //}

  //public get isNotLoggedIn(): boolean {
  //  return this.user.length === 0 || this.user === 'Undefined';
  //}

  ngOnInit() {
    this.loggedInService.castUser.subscribe((data) => {
      console.log('TablesOverview: user name changed to', data);
      this.user = data;
    });
  }
}
