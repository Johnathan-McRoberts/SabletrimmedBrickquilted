import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';

import { SharedModule } from './../../../shared/shared-module';
import { BookTablesService } from './../../../tables/services/book-tables-service';
import { ITalliedBook } from '../../../shared/models/books/itallied-book';

@Component({
  imports: [CommonModule, MatTableModule, MatProgressSpinnerModule, SharedModule],
  selector: 'app-book-tallies',
  templateUrl: './book-tallies.html',
  styleUrl: './book-tallies.scss',
})
export class BookTallies implements OnInit {

  readonly $loadingTallies = signal(true);
  readonly $hasTallyData = signal(false);

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

  public get loading(): boolean {
    return this._tallies === undefined;
  }
  public get hasData(): boolean {
    return !this.loading;
  }
  public get displayedColumns(): string[] {
    return this.columns;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  constructor() {
    this._tallies = [];

    this.dataSource = new MatTableDataSource(this._tallies);
  }

  dataSource: MatTableDataSource<ITalliedBook>;

  ngOnInit() {
    this.$loadingTallies.set(true);
    this.getTallies();
  }

  getTallies() {
    this._bookTablesService.getBookTallies().subscribe((resp) => {
      console.log('Rxed resp:', JSON.stringify(resp).substring(0, 100));
      if (resp !== null && resp !== undefined && resp.length > 0) {
        // got the data ok
        this._tallies = resp;
        this.dataSource = new MatTableDataSource(this._tallies);
        this.$hasTallyData.set(true);
        this.$loadingTallies.set(false);
      } else {
        // an error occured
        this.openSnackBar('Get Book tallies failed: ', 'OK');
      }
    });
  }
}
