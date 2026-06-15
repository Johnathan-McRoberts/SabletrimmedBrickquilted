import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { UserToolbar } from './components/user-toolbar/user-toolbar';

import { SharedModule } from './../shared/shared-module';

@NgModule({
  declarations: [UserToolbar],
  imports:
    [
      CommonModule,

      MatButtonModule,
      MatIconModule,
      MatToolbarModule,
      SharedModule
  ],
  exports: [UserToolbar]
})
export class UserToolbarModule {}
