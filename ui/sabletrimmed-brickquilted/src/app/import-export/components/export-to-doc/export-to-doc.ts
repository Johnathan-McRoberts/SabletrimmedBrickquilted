import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';

import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

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

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-export-to-doc',
  imports:
    [
      FormsModule,
      ReactiveFormsModule,

    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatRadioModule
  ],
  templateUrl: './export-to-doc.html',
  styleUrl: './export-to-doc.scss',
})
export class ExportToDoc implements OnInit {

  private _exportService = inject(ExportService);
  private _loggedInService = inject(LoggedInService);
  private _downloadService = inject(DownloadService);
  private _snackBar = inject(MatSnackBar);

  private _documentTypes: IDocumentType[] | undefined = undefined;
  private _exportOptions: IExportOption[] | undefined = undefined;


  constructor(private changeDetectorRef: ChangeDetectorRef) {

    this._documentTypes = [];
    this._exportOptions = [];
  }

  public get documentTypes(): IDocumentType[] {
    return this._documentTypes || [];
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
    this.changeDetectorRef.detectChanges();
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

            this.changeDetectorRef.detectChanges();
          }
          else {

            // an error occured
            this.openSnackBar('Get Export options failed: ', 'OK');
          }

        });
  }

  selectedDocType: string = '';
  public onDocSelection() {
    console.log("now selected : ", this.selectedDocType);
  }

  public get hasDocumentTypeSelection(): boolean {
    return this._documentTypes !== undefined && this._documentTypes.length > 0 &&
      this._selectedDocumentType !== undefined && this.selectedDocType !== '';
  }

  private _selectedDocumentType: string | undefined = undefined;
  public get selectedDocumentType(): string {
    if (!this._selectedDocumentType)
      return "undefined";

    return this._selectedDocumentType;
  }
  public set selectedDocumentType(documentType: string) {
    this._selectedDocumentType = documentType;

    //this.setupDocumentTypeDescription();
    //this.setupExportOptions();
  }
}
