import { Component, inject, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { SharedModule } from './../../../shared/shared-module';
import { BookTablesService } from './../../../tables/services/book-tables-service';

import { IBookAuthor } from '../../../shared/models/books/ibook-author';

@Component({
  imports:
    [
      CommonModule,

      MatButtonModule,
      MatChipsModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatPaginatorModule,
      MatProgressSpinnerModule,
      MatSortModule,
      MatTableModule,
      MatTabsModule,

      SharedModule
    ],
  selector: 'app-authors',
  templateUrl: './authors.html',
  styleUrl: './authors.scss',
})
export class Authors implements AfterViewInit {

  constructor() {

    this._authors = [];

    this.dataSource = new MatTableDataSource(this._authors);
  }

  dataSource: MatTableDataSource<IBookAuthor>;

  @ViewChild(MatPaginator) public paginator: MatPaginator | any;
  @ViewChild(MatSort) public sort: MatSort | any;

  private _bookTablesService = inject(BookTablesService);

  private _snackBar = inject(MatSnackBar);

  private _authors: IBookAuthor[] | undefined = undefined;

  public expandedElement: IBookAuthor | null = null;

  private readonly columns: string[] = [
    'name',
    'nationality',
    'language',
    'totalBooksReadBy',
    'totalPages',
  ];
  public columnsToDisplayWithExpand = [...this.columns, 'expand'];

  public get loading(): boolean { return this._authors === undefined; }
  public get hasData(): boolean { return !this.loading; }

  public get displayedColumns(): string[] { return this.columnsToDisplayWithExpand; }

  ngAfterViewInit() {
    this.getAuthors();
  }

  getAuthors() {
    this._bookTablesService
      .getAuthors()
      .subscribe(
        resp => {
          console.log('Rxed resp:', JSON.stringify(resp));
          if (resp !== null && resp !== undefined && resp.length > 0) {

            // got the data ok 
            this._authors = resp;
            this.dataSource = new MatTableDataSource(this._authors);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          }
          else {

            // an error occured
            this.openSnackBar('Get Authors failed: ', 'OK');
          }

        });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  /** Checks whether an element is expanded. */
  isExpanded(element: IBookAuthor) {
    return this.expandedElement === element;
  }

  /** Toggles the expanded state of an element. */
  toggle(element: IBookAuthor) {
    console.log('toggle:', JSON.stringify(element));
    this.expandedElement = this.isExpanded(element) ? null : element;
  }
}
