import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ViewChild,
  signal,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

// Chart imports
import { DateTime } from 'luxon';
import 'chartjs-adapter-luxon';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';

import { BaseChartDirective } from 'ng2-charts';
import { chartColours } from './../../../models/chart-colour-constants';

// data imports
import { ChartDataService } from './../../../services/chart-data-service';
import { IBooksTotal } from './../../../models/books-total';

@Component({
  selector: 'app-overall-tallies-chart',
  imports: [BaseChartDirective, CommonModule, MatProgressSpinnerModule, MatSnackBarModule],
  templateUrl: './overall-tallies-chart.html',
  styleUrl: './overall-tallies-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverallTalliesChart implements OnInit {
  // Inject services
  private _chartDataService = inject(ChartDataService);
  private _snackBar = inject(MatSnackBar);

  // local data for chart
  public chartLabels: Date[] = [];
  public bookTotalsData: number[] = [];
  public pageTotalsData: number[] = [];
  public lineChartOptions: ChartConfiguration['options'] = {
    interaction: {
      intersect: false,
    },
    responsive: true,

    plugins: {
      title: {
        display: true,
        text: 'Books and Pages Totals',
      },
      decimation: {
        algorithm: 'lttb',
        enabled: true,
        samples: 100,
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          // Luxon format string
          tooltipFormat: 'DD T',
        },
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Books',
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Pages',
        },

        // grid line settings
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    },
  };
  public lineChartType: ChartType = 'line';

  // signal to indicate loading state
  readonly $loadingData = signal(true);

  // computed chart data
  readonly $lineChartsData = computed<ChartConfiguration['data']>(() => {
    const newChartData: ChartConfiguration['data'] = {
      datasets: [
        this.getBooksChartDataSets(this.bookTotalsData),
        this.getPagesChartDataSets(this.pageTotalsData),
      ],
      labels: this.chartLabels,
    };

    return newChartData;
  });

  private readonly decimationEnabled: boolean = false;

  private setupDataSets(booksTotals: IBooksTotal[]) {
    const dates: Date[] = [];
    const books: number[] = [];
    const pages: number[] = [];

    for (let i = 0; i < booksTotals.length; i++) {
      const bookTotal = booksTotals[i];

      if (i < 3) {
        const text: string = 'bookTotal[' + i + ']';
        console.log(text, JSON.stringify(bookTotal));
      }

      const year: number = +bookTotal.datestring.substring(0, 4);
      const month: number = +bookTotal.datestring.substring(5, 7);
      const day: number = +bookTotal.datestring.substring(8, 10);

      const theDate: DateTime = DateTime.utc(year, month, day);

      if (theDate) {
        dates.push(theDate.toJSDate());
        books.push(bookTotal.totalBooksRead);
        pages.push(bookTotal.totalPagesRead);
      }
    }

    if (dates.length <= 100 || !this.decimationEnabled) {
      this.chartLabels = dates;
      this.bookTotalsData = books;
      this.pageTotalsData = pages;
    } else {
      const step: number = dates.length / 100;
      let location = 0;
      let index = 0;

      const text: string = 'step = ' + step + ' count = ' + dates.length;
      console.log(text);

      const trimmedDates: Date[] = [];
      const trimmedBooks: number[] = [];
      const trimmedPages: number[] = [];

      do {
        trimmedDates.push(dates[index]);
        trimmedBooks.push(books[index]);
        trimmedPages.push(pages[index]);

        location += step;
        index = Math.floor(location);
        //Math.floor(
      } while (index <= dates.length - 1);

      trimmedDates.push(dates[dates.length - 1]);
      trimmedBooks.push(books[dates.length - 1]);
      trimmedPages.push(pages[dates.length - 1]);

      this.chartLabels = trimmedDates;
      this.bookTotalsData = trimmedBooks;
      this.pageTotalsData = trimmedPages;

      const finalText: string =
        'final index = ' + index + ' trimmedPages length = ' + trimmedPages.length;
      console.log(finalText);
    }
  }

  // children
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  // lifecycle hooks
  ngOnInit() {
    console.log('BookAndPageRates: ngOnInit');

    this.$loadingData.set(true);
    this.getTallies();
  }

  // methods
  getTallies() {
    this._chartDataService.getBooksTotals().subscribe((resp: IBooksTotal[]) => {
      console.log('Rxed resp:', JSON.stringify(resp).substring(0, 100));
      if (resp !== null && resp !== undefined && resp.length > 0) {
        this.setupDataSets(resp);

        this.$loadingData.set(false);
      } else {
        // an error occured
        this.openSnackBar('Get chart books totals failed: ', 'OK');
      }
    });
  }

  public getPagesChartDataSets(pagesData: number[]) {
    const dataset = {
      data: pagesData,
      label: 'Page Totals',
      borderColor: chartColours.red,
      backgroundColor: chartColours.red,

      borderWidth: 1,

      pointStyle: 'circle',
      pointRadius: 2,
      pointHoverRadius: 15,

      pointBackgroundColor: chartColours.redFaint,
      pointBorderColor: chartColours.red,
      pointHoverBackgroundColor: chartColours.yellowFaint,
      pointHoverBorderColor: chartColours.grey,

      fill: false,
      yAxisID: 'y1',
    };

    return dataset;
  }

  public getBooksChartDataSets(booksData: number[]) {
    const dataset = {
      data: booksData,
      label: 'Book Totals',
      backgroundColor: chartColours.blueFaint,
      borderColor: chartColours.blue,
      borderWidth: 1,

      pointStyle: 'circle',
      pointRadius: 2,
      pointHoverRadius: 15,

      pointBackgroundColor: chartColours.blueFaint,
      pointBorderColor: chartColours.blue,
      pointHoverBackgroundColor: chartColours.orangeFaint,
      pointHoverBorderColor: chartColours.grey,

      fill: false,
      yAxisID: 'y',
    };

    return dataset;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  // events
  public chartClicked({ event, active }: { event?: ChartEvent; active?: object[] }): void {
    console.log(event, active);
  }
}
