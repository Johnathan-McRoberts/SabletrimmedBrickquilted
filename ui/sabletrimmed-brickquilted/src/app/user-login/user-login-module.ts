import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';

import { Login } from './components/login/login';

import { LoggedInService } from './../shared/services/logged-in-service';

@NgModule({
  imports:
    [
      CommonModule,
      MatButtonModule,
      MatFormFieldModule,
      MatInputModule,
      MatIconModule,
      MatSnackBarModule,
      MatToolbarModule
    ],
  declarations: [Login],
  exports: [Login],
  providers: [LoggedInService]
})
export class UserLoginModule { }
