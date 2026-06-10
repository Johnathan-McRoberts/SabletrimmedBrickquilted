import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from './shared/shared-module';

@Component({
  selector: 'app-root',
  imports:
    [

      HttpClientModule,

      RouterOutlet,
      MatButtonModule,
      MatDividerModule,
      MatIconModule,
      MatTabsModule,
      SharedModule
    ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('sabletrimmed-brickquilted');
}
