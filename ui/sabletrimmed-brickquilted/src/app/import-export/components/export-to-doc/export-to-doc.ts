import { Component, inject, OnInit } from '@angular/core';

import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';

import {
  MatSnackBar,
} from '@angular/material/snack-bar';

import
{
  ExportOptionsResponseDto,
  IDocumentType,
  IExportOption
} from '../../models/export-options-response-dto';

import { DownloadService } from '../../services/download-service';
import { ExportService } from '../../services/export-service';
import { LoggedInService } from './../../../shared/services/logged-in-service';

@Component({
  selector: 'app-export-to-doc',
  imports: [MatSelectModule, MatSnackBarModule, MatRadioModule],
  templateUrl: './export-to-doc.html',
  styleUrl: './export-to-doc.scss',
})
export class ExportToDoc {

  private _exportService = inject(ExportService);
  private _loggedInService = inject(LoggedInService);
  private _downloadService = inject(DownloadService);
  private _snackBar = inject(MatSnackBar);

  private _documentTypes: IDocumentType[] | undefined = undefined;
  private _exportOptions: IExportOption[] | undefined = undefined;

  constructor() {

    this._documentTypes = [];
    this._exportOptions = [];
  }

  public get loading(): boolean {
    return this._documentTypes === undefined || this._exportOptions === undefined;
  }
  public get hasData(): boolean {
    return !this.loading;
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ngOnInit() {
    this.getExportOptions();
  }

  getExportOptions() {
    this._exportService
      .getExportOptions()
      .subscribe(
        resp => {


          console.log('Rxed resp:', JSON.stringify(resp));
          if (resp !== null && resp !== undefined && resp.documentTypes.length > 0) {

            this._documentTypes = resp.documentTypes;
            this._exportOptions = resp.exportOptions;

            // work ok
            this.openSnackBar('Get Export options passed: ', 'OK');
            // got the data ok 
            //this._options = resp;
            //this.setupDocumentTypes();
          }
          else {

            // an error occured
            this.openSnackBar('Get Export options failed: ', 'OK');
          }

          //console.log('Rxed resp:', JSON.stringify(resp));
          //if (resp !== null && resp !== undefined && resp.length > 0) {

          //  // got the data ok 
          //  this._books = resp;
          //  this.dataSource = new MatTableDataSource(this._books);
          //  this.dataSource.paginator = this.paginator;
          //  this.dataSource.sort = this.sort;
          //}
          //else {

          //  // an error occured
          //  this.openSnackBar('Get Export options failed: ', 'OK');
          //}

        });
  }
}
