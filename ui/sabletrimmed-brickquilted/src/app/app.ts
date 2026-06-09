import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from './shared/shared-module';

@Component({
  selector: 'app-root',
  imports:
    [

      HttpClientModule,

      RouterOutlet,
      MatSlideToggle,
      MatButtonModule,
      MatDividerModule,
      MatIconModule

      , SharedModule
    ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('sabletrimmed-brickquilted');
}
