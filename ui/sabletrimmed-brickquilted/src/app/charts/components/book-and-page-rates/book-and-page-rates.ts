import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ViewChild,
  signal,
  inject,
  OnInit, AfterViewInit

} from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';

import { DateTime } from 'luxon';
import 'chartjs-adapter-luxon';

import {
  Chart,
  ChartConfiguration,
  Plugin,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  ChartEvent,
  ChartType
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import ChartDataLabels from 'chartjs-plugin-datalabels';

//import { Colors } from 'chart.js';
// Register Chart.js components
Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  ChartDataLabels,
);


import { ChartDataService } from './../../services/chart-data-service';

import { IBooksTotal } from './../../models/books-total';


export const CHART_COLORS = {
  red: 'rgb(255, 99, 132)',
  redFaint: 'rgba(255, 99, 132, 0.5)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  orangeFaint: 'rgba(255, 159, 64, 0.5)',
  yellowFaint: 'rgba(255, 205, 86, 0.5)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  blueFaint: 'rgba(54, 162, 235, 0.5)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
};

//const NAMED_COLORS = [
//  CHART_COLORS.red,
//  CHART_COLORS.redFaint,
//  CHART_COLORS.orange,
//  CHART_COLORS.yellow,
//  CHART_COLORS.green,
//  CHART_COLORS.blue,
//  CHART_COLORS.blueFaint,
//  CHART_COLORS.purple,
//  CHART_COLORS.grey,
//];


@Component({
  selector: 'app-book-and-page-rates',
  imports: [
    BaseChartDirective,
    CommonModule,
    MatProgressSpinnerModule,
    MatSnackBarModule],
  templateUrl: './book-and-page-rates.html',
  styleUrl: './book-and-page-rates.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookAndPageRates implements OnInit, AfterViewInit {
  readonly $loadingData = signal(true);

  private _chartDataService = inject(ChartDataService);
  private _snackBar = inject(MatSnackBar);

  ngOnInit() {
    console.log("BookAndPageRates: ngOnInit")

    this.$loadingData.set(true);
    this.getTallies();
  }

  getTallies() {
    this._chartDataService.getBooksTotals().subscribe((resp: IBooksTotal[]) => {
      console.log('Rxed resp:', JSON.stringify(resp).substring(0, 100));
      if (resp !== null && resp !== undefined && resp.length > 0) {

        this.SetupDataSets(resp);

        console.log('labels:',
          JSON.stringify(this.chartLabels).substring(0, 200));
        console.log('books:',
          JSON.stringify(this.bookTotalsData).substring(0, 200));
        console.log('pages:',
          JSON.stringify(this.pageTotalsData).substring(0, 200));

        this.$loadingData.set(false);
      } else {
        // an error occured
        this.openSnackBar('Get Book tallies failed: ', 'OK');
      }
    });
  }

  private SetupDataSets(booksTotals: IBooksTotal[]) {
    const dates: Date[] = [];
    const books: number[] = [];
    const pages: number[] = [];

    for (let i = 0; i < booksTotals.length; i++) {
      const bookTotal = booksTotals[i];

      if (i < 3) {
        const text: string = 'bookTotal[' + i + ']';
        console.log(text,
          JSON.stringify(bookTotal));
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

    if (dates.length <= 100) {
      this.chartLabels = dates;
      this.bookTotalsData = books;
      this.pageTotalsData = pages;

    }
    else {
      const step: number = dates.length / 100;
      let location: number = 0;
      let index: number = 0;

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
      } while (index < dates.length);

      this.chartLabels = trimmedDates;
      this.bookTotalsData = trimmedBooks;
      this.pageTotalsData = trimmedPages;
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  ngAfterViewInit() {
    console.log("BookAndPageRates: ngAfterViewInit")
  }

  readonly $lineChartsData = computed<ChartConfiguration['data']>(() => {

    const newChartData: ChartConfiguration['data'] = {
      datasets: [
        this.getbooksChartDataSets(this.bookTotalsData),
        this.getPagesChartDataSets(this.pageTotalsData),
      ],
      labels: this.chartLabels,
    }
    console.log("new chart data \n" + JSON.stringify(newChartData));
    return newChartData;
  });

  public getPagesChartDataSets(pagesData: number[]) {
    const dataset =
    {
      data: pagesData,
      label: 'Page Totals',
      borderColor: CHART_COLORS.red,
      backgroundColor: CHART_COLORS.red,

      borderWidth: 1,

      pointStyle: 'circle',
      pointRadius: 2,
      pointHoverRadius: 15,


      pointBackgroundColor: CHART_COLORS.redFaint,
      pointBorderColor: CHART_COLORS.red,
      pointHoverBackgroundColor: CHART_COLORS.yellowFaint,
      pointHoverBorderColor: CHART_COLORS.grey,

      fill: false,
      yAxisID: 'y1',
    };

    return dataset;
  }


  public getbooksChartDataSets(booksData: number[]) {
    const dataset =
    {
      data: booksData,
      label: 'Book Totals',
      backgroundColor: CHART_COLORS.blueFaint,
      borderColor: CHART_COLORS.blue,
      borderWidth: 1,

      pointStyle: 'circle',
      pointRadius: 2,
      pointHoverRadius: 15,


      pointBackgroundColor: CHART_COLORS.blueFaint,
      pointBorderColor: CHART_COLORS.blue,
      pointHoverBackgroundColor: CHART_COLORS.orangeFaint,
      pointHoverBorderColor: CHART_COLORS.grey,

      fill: false,
      yAxisID: 'y',
    };

    return dataset;
  }

  private newLabel?= 'New label';

  public chartLabels: Date[] = [

    this.newDate(1),
    this.newDate(3),
  ];

  public bookTotalsData: number[] = [28, 48];

  public pageTotalsData: number[] = [180, 480];

  public lineChartOptions: ChartConfiguration['options'] = {

    interaction: {
      intersect: false
    },
    responsive: true,

    plugins: {
      title: {
        display: true,
        text: 'Books and Pages Totals'
      },

      datalabels: {
        labels: {
          title: {
            color: '#FFFFFF',
            anchor: 'start',
            align: 'right',
            textAlign: 'left',
            font: {
              weight: 'normal',
              size: 1,
            },
          },
          value: {
            color: '#FFFFFF',
            anchor: 'start',
            align: 'left',
            font: {
              weight: 'bold',
              size: 1,
            },
          },
        },
      },

      decimation: {
        algorithm: 'lttb',
        enabled: true,
        samples: 100
      }
    },
    scales: {
      x: {
        type: 'time',
        time: {
          // Luxon format string
          tooltipFormat: 'DD T'
        },
        title: {
          display: true,
          text: 'Date'
        },
      },


      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',

        // grid line settings
        grid: {
          drawOnChartArea: false, // only want the grid lines for one axis to show up
        },
      },
    }
  };

  public lineChartType: ChartType = 'line';

  readonly $chartMaxHeight = computed(() => {

    return 600;
  });

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;


  newDate(days: number): Date {
    return DateTime.now().plus({ days }).toJSDate();
  }

  newDateFromDay(day: number, month: number, year: number): Date {
    const date: DateTime = DateTime.utc(year, month, day);
    return date.toJSDate();
  }


  // events
  public chartClicked({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event?: ChartEvent;
    active?: object[];
  }): void {
    //console.log(event, active);
  }

}
