import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
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

import { IReadBook } from '../../../shared/models/books/iread-book';

@Component({
  imports: [
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

    SharedModule,
  ],
  selector: 'app-read-books',
  templateUrl: './read-books.html',
  styleUrl: './read-books.scss',
})
export class ReadBooks implements AfterViewInit {
  constructor() {
    this._books = [];

    this.dataSource = new MatTableDataSource(this._books);
  }

  dataSource: MatTableDataSource<IReadBook>;

  @ViewChild(MatPaginator) public paginator: MatPaginator | any;
  @ViewChild(MatSort) public sort: MatSort | any;

  private _bookTablesService = inject(BookTablesService);

  private _snackBar = inject(MatSnackBar);

  private _books: IReadBook[] | undefined = undefined;

  public expandedElement: IReadBook | null = null;

  private readonly columns: string[] = ['date', 'author', 'title', 'pages'];
  public columnsToDisplayWithExpand = [...this.columns, 'expand'];

  public get loading(): boolean {
    return this._books === undefined;
  }
  public get hasData(): boolean {
    return !this.loading;
  }

  public get displayedColumns(): string[] {
    return this.columnsToDisplayWithExpand;
  }

  ngAfterViewInit() {
    this.getBooks();
  }

  getBooks() {
    this._bookTablesService.getReadBooks().subscribe((resp) => {
      console.log('Rxed resp:', JSON.stringify(resp));
      if (resp !== null && resp !== undefined && resp.length > 0) {
        // got the data ok
        this._books = resp;
        this.dataSource = new MatTableDataSource(this._books);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } else {
        // an error occured
        this.openSnackBar('Get Books read failed: ', 'OK');
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
  isExpanded(element: IReadBook) {
    return this.expandedElement === element;
  }

  /** Toggles the expanded state of an element. */
  toggle(element: IReadBook) {
    console.log('toggle:', JSON.stringify(element));
    this.expandedElement = this.isExpanded(element) ? null : element;
  }
}
