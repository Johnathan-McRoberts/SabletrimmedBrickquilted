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

//import { ViewportRuler } from '@angular/cdk/scrolling';
import {
ChartData,
ChartOptions,
ChartConfiguration,
ChartEvent,
ChartType
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

//import { Colors } from 'chart.js';


import { ChartDataService } from './../../services/chart-data-service';

import { IBooksTotal } from './../../models/books-total';


//Chart.register(Colors);

@Component({
  selector: 'app-book-and-page-rates',
  imports: [BaseChartDirective, CommonModule, MatProgressSpinnerModule],
  templateUrl: './book-and-page-rates.html',
  styleUrl: './book-and-page-rates.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookAndPageRates implements OnInit, AfterViewInit {
  readonly $loadingData = signal(true);

  private _chartDataService = inject(ChartDataService);

  ngOnInit() {
    console.log("BookAndPageRates: ngOnInit")

    this.$loadingData.set(true);
    this.getTallies();
  }

  getTallies() {
    this._chartDataService.getBooksTotals().subscribe((resp: IBooksTotal[]) => {
      console.log('Rxed resp:', JSON.stringify(resp).substring(0, 100));
      if (resp !== null && resp !== undefined && resp.length > 0) {
        // got the data ok
        //this._tallies = resp;
        //this.dataSource = new MatTableDataSource(this._tallies);
        //this.$hasTallyData.set(true);
        this.$loadingData.set(false);
      } else {
        // an error occured
        //this.openSnackBar('Get Book tallies failed: ', 'OK');
      }
    });
  }

  ngAfterViewInit() {
    console.log("BookAndPageRates: ngAfterViewInit")
  }




  //readonly $hasTallyData = signal(false);

  //private _bookTablesService = inject(BookTablesService);

  //private _snackBar = inject(MatSnackBar);

  //private _tallies: ITalliedBook[] | undefined = undefined;


  private newLabel?= 'New label';

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Series A',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90],
        label: 'Series B',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
      {
        data: [180, 480, 770, 90, 1000, 270, 400],
        label: 'Series C',
        yAxisID: 'y1',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
    ],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
      },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red',
        },
      },
    },

    plugins: {
      legend: { display: true },
      //annotation: {
      //  annotations: [
      //    {
      //      type: 'line',
      //      scaleID: 'x',
      //      value: 'March',
      //      borderColor: 'orange',
      //      borderWidth: 2,
      //      label: {
      //        display: true,
      //        position: 'center',
      //        color: 'orange',
      //        content: 'LineAnno',
      //        font: {
      //          weight: 'bold',
      //        },
      //      },
      //    },
      //  ],
      //},
    },
  };

  public lineChartType: ChartType = 'line';

  readonly $chartMaxHeight = computed(() => {

    return 600;
    //const data = this.$data();
    //const webLineHeightPx = 44;
    //const mobileLineHeightPx = 60;
    //const baseHeightPx = this.$isMobile()
    //  ? mobileLineHeightPx
    //  : webLineHeightPx;
    //const minimumLength = data.length === 1 ? 2 : data.length; //If has only 1 line of data, show at least 2 lines height
    //return data ? minimumLength * baseHeightPx : 300;
  });

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

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
