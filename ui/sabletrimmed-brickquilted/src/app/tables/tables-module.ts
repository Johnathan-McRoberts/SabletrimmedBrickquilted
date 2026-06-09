import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { TablesOverview } from './components/tables-overview/tables-overview';
import { BookTablesService } from './services/book-tables-service';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [TablesOverview],
  exports:
    [
      TablesOverview
    ],
  providers: [BookTablesService]
})
export class TablesModule {}
