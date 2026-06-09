import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

import { MainToolbar } from './components/main-toolbar/main-toolbar';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule
  ],
  declarations: [MainToolbar],
  exports:
    [
      MainToolbar
    ],
  providers: []
})
export class SharedModule {}
