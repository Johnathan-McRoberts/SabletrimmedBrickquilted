import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import {
  MatSnackBar,
} from '@angular/material/snack-bar';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { LoggedInService } from './../../../shared/services/logged-in-service';
import { SharedModule } from './../../../shared/shared-module';
import { BookTablesService } from './../../../tables/services/book-tables-service';
import { ITalliedBook } from '../../../shared/models/books/itallied-book';

@Component({
  imports:
    [
      CommonModule,
      MatSnackBarModule,
      MatTableModule,
      MatSortModule,
      MatInputModule,
      MatProgressSpinnerModule,

      SharedModule
    ],
  selector: 'app-book-tallies',
  templateUrl: './book-tallies.html',
  styleUrl: './book-tallies.scss'
})
export class BookTallies implements OnInit {

  private _bookTablesService = inject(BookTablesService);

  private _snackBar = inject(MatSnackBar);

  private _tallies: ITalliedBook[] | undefined = undefined;

  private readonly columns: string[] = [
    'dateString',
    'author',
    'title',
    'pages',
    'totalBooks',
    'totalBookFormat',
    'totalComicFormat',
    'totalAudioFormat',
    'totalPagesRead',
  ];

  public get loading(): boolean { return this._tallies === undefined; }
  public get hasData(): boolean { return !this.loading; }
  public get dataSource(): any { return !this.loading ? this._tallies : []; }
  public get displayedColumns(): string[] { return this.columns; }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ngOnInit() {
    this.getTallies();
  }

  getTallies() {
    this._bookTablesService
      .getBookTallies()
      .subscribe(
        resp => {
          console.log('Rxed resp:', JSON.stringify(resp));
          if (resp !== null && resp !== undefined && resp.length > 0) {

            // got the data ok 
            this._tallies = resp;
          }
          else {

            // an error occured
            this.openSnackBar('Get Book tallies failed: ', 'OK');
          }
        });
  }
}
