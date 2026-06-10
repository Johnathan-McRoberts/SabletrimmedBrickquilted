import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { SharedModule } from './../shared/shared-module';

import { Authors } from './components/authors/authors';
import { ReadBooks } from './components/read-books/read-books';
import { BookTallies } from './components/book-tallies/book-tallies';
import { TablesOverview } from './components/tables-overview/tables-overview';

import { BookTablesService } from './services/book-tables-service';

@NgModule({
  declarations: [
    TablesOverview
  ],
  imports: [
    Authors,
    BookTallies,
    ReadBooks,
    CommonModule,

    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    SharedModule
  ],
  exports:
    [
      TablesOverview
    ],
  providers: [BookTablesService]
})
export class TablesModule {}
