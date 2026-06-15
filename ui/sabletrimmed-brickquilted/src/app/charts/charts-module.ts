import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

import { SharedModule } from './../shared/shared-module';

import { ChartsOverview } from './components/charts-overview/charts-overview';

@NgModule({
  declarations:
    [
      ChartsOverview
    ],
  imports:
    [
      CommonModule,

      MatButtonModule,
      MatIconModule,
      MatTabsModule,
      SharedModule
    ],
  exports:
    [
      ChartsOverview
    ],
})
export class ChartsModule {}
