import { Component } from '@angular/core';
import { BookTallies } from './../book-tallies/book-tallies';
import { Authors } from './../authors/authors';
import { ReadBooks } from './../read-books/read-books';

@Component({
  standalone: false,  // this is now required when using NgModule
  selector: 'app-tables-overview',
  templateUrl: './tables-overview.html',
  styleUrl: './tables-overview.scss',
})
export class TablesOverview {}
