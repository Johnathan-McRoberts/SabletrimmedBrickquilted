import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { LoggedInService } from './../../../shared/services/logged-in-service';
import { SharedModule } from './../../../shared/shared-module';
import { BookTablesService } from './../../../tables/services/book-tables-service';

@Component({
  imports:
    [
      SharedModule
    ],
  selector: 'app-book-tallies',
  templateUrl: './book-tallies.html',
  styleUrl: './book-tallies.scss'
})
export class BookTallies {

  private router = inject(Router);
  private loggedInService = inject(LoggedInService);
  private bookTablesService = inject(BookTablesService);
}
