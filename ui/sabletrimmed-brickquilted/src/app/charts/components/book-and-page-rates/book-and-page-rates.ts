import {
  ChangeDetectionStrategy,
  Component,
  computed,

} from '@angular/core';

import
{
  ChartData,
  ChartOptions,
  ChartConfiguration,
  ChartEvent,
  ChartType
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';


@Component({
  selector: 'app-book-and-page-rates',
  imports: [BaseChartDirective],
  templateUrl: './book-and-page-rates.html',
  styleUrl: './book-and-page-rates.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookAndPageRates {

  chartType: ChartType = 'line';

  data: ChartData<'line'> = {
    labels: ['one', 'two', 'three'],
    datasets: [
      {
        label: 'data 1',
        data: [350, 450, 100]
      },
      {
        label: 'data 2',
        data: [100, 250, 50]
      }
    ]
  };

  options: ChartOptions<'line'> = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };


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

}
