import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { OverallTalliesChart } from './../overall-tallies-chart/overall-tallies-chart';
import { DaysPerBookChart } from './../days-per-book-chart/days-per-book-chart';
import { PageRateChart } from './../page-rate-chart/page-rate-chart';

@Component({
  selector: 'app-books-and-page-rates-charts',
  imports: [MatTabsModule, OverallTalliesChart, DaysPerBookChart, PageRateChart],
  templateUrl: './books-and-page-rates-charts.html',
  styleUrl: './books-and-page-rates-charts.scss',
})
export class BooksAndPageRatesCharts {}
