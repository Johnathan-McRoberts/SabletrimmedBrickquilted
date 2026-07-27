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
import { IBooksAndPagesRate } from './../../../models//books-and-pages-rate';

@Component({
  selector: 'app-page-rate-chart',
  imports: [BaseChartDirective, CommonModule, MatProgressSpinnerModule, MatSnackBarModule],
  templateUrl: './page-rate-chart.html',
  styleUrl: './page-rate-chart.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageRateChart implements OnInit {
  private readonly OverallSeries: number = 1;
  private readonly AnnualSeries: number = 2;
  private readonly LastTenSeries: number = 3;

  // Inject services
  private _chartDataService = inject(ChartDataService);
  private _snackBar = inject(MatSnackBar);

  // local data for chart
  public chartLabels: Date[] = [];

  public overallPageRatesData: number[] = [];
  public annualPageRatesData: number[] = [];
  public lastTenPageRatesData: number[] = [];

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
          text: 'Daily Page Rate',
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
        this.getRateChartDataSets(this.overallPageRatesData, this.OverallSeries),
        this.getRateChartDataSets(this.annualPageRatesData, this.AnnualSeries),
        this.getRateChartDataSets(this.lastTenPageRatesData, this.LastTenSeries),
      ],
      labels: this.chartLabels,
    };

    return newChartData;
  });

  private setupDataSets(allRates: IBooksAndPagesRate[]) {
    const dates: Date[] = [];
    const overallPageRates: number[] = [];
    const annualPageRates: number[] = [];
    const lastTenPageRates: number[] = [];

    for (let i = 0; i < allRates.length; i++) {
      const rate = allRates[i];

      if (i < 3) {
        const text: string = 'rate[' + i + ']';
        console.log(text, JSON.stringify(rate));
      }

      const year: number = +rate.datestring.substring(0, 4);
      const month: number = +rate.datestring.substring(5, 7);
      const day: number = +rate.datestring.substring(8, 10);

      const theDate: DateTime = DateTime.utc(year, month, day);

      if (theDate) {
        dates.push(theDate.toJSDate());
        overallPageRates.push(rate.overallRates.pageRate);
        annualPageRates.push(rate.annualRates.pageRate);
        lastTenPageRates.push(rate.lastTenRates.pageRate);
      }
    }

    this.chartLabels = dates;
    this.overallPageRatesData = overallPageRates;
    this.annualPageRatesData = annualPageRates;
    this.lastTenPageRatesData = lastTenPageRates;
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
    this._chartDataService.getAllRates().subscribe((resp: IBooksAndPagesRate[]) => {
      console.log('Rxed resp:', JSON.stringify(resp).substring(0, 100));
      if (resp !== null && resp !== undefined && resp.length > 0) {
        this.setupDataSets(resp);

        this.$loadingData.set(false);
      } else {
        // an error occured
        this.openSnackBar('Get chart rates failed: ', 'OK');
      }
    });
  }

  public getRateChartDataSets(ratesData: number[], series: number) {
    let label = '';
    let mainColour = '';
    let backgroundColour = '';
    let pointHoverMainColour = '';
    let pointHoverBorderColour = '';

    switch (series) {
      case this.OverallSeries:
        label = 'Overall Page Rate';
        mainColour = chartColours.red;
        backgroundColour = chartColours.redFaint;
        pointHoverMainColour = chartColours.yellowFaint;
        pointHoverBorderColour = chartColours.grey;
        break;

      case this.AnnualSeries:
        label = 'Annual Page Rate';
        mainColour = chartColours.green;
        backgroundColour = chartColours.greenFaint;
        pointHoverMainColour = chartColours.purpleFaint;
        pointHoverBorderColour = chartColours.grey;
        break;

      case this.LastTenSeries:
        label = 'Last Ten Page Rate';
        mainColour = chartColours.blue;
        backgroundColour = chartColours.blueFaint;
        pointHoverMainColour = chartColours.orangeFaint;
        pointHoverBorderColour = chartColours.grey;
        break;
    }

    const dataset = {
      data: ratesData,
      label: label,
      borderColor: mainColour,
      backgroundColor: mainColour,

      borderWidth: 1,

      pointStyle: 'circle',
      pointRadius: 2,
      pointHoverRadius: 15,

      pointBackgroundColor: backgroundColour,
      pointBorderColor: mainColour,
      pointHoverBackgroundColor: pointHoverMainColour,
      pointHoverBorderColor: pointHoverBorderColour,

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
