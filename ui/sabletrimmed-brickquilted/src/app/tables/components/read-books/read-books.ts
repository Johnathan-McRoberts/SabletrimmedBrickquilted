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
  selector: 'app-read-books',
  templateUrl: './read-books.html',
  styleUrl: './read-books.scss',
})
export class ReadBooks {}
