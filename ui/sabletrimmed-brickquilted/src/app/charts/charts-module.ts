import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { SharedModule } from './../shared/shared-module';

import { ChartsOverview } from './components/charts-overview/charts-overview';
import { BookAndPageRates } from './components/book-and-page-rates/book-and-page-rates';

import { ChartDataService } from './services/chart-data-service';

@NgModule({
  declarations: [ChartsOverview],
  imports: [
    BookAndPageRates,

    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,

    SharedModule],
  exports: [ChartsOverview],
  providers: [ChartDataService],
})
export class ChartsModule {}
