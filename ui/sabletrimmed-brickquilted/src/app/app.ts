import { Component, signal } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';

import { SharedModule } from './shared/shared-module';
import { ChartsModule } from './charts/charts-module';
import { DataFormsModule } from './forms/data-forms-module';
import { TablesModule } from './tables/tables-module';
import { UserLoginModule } from './user-login/user-login-module';
import { UserToolbarModule } from './toolbar/user-toolbar-module';

@Component({
  selector: 'app-root',
  imports: [
    HttpClientModule,
    RouterOutlet,

    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTabsModule,

    SharedModule,
    ChartsModule,
    DataFormsModule,
    TablesModule,
    UserLoginModule,

    UserToolbarModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('sabletrimmed-brickquilted');
}
