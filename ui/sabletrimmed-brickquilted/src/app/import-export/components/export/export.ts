import { Component, inject, OnInit, AfterViewInit, ChangeDetectorRef } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import {
  ExportOptionsResponseDto,
  IDocumentType,
  IExportOption,
} from '../../models/export-options-response-dto';
import { DownloadService } from '../../services/download-service';

import { ExportService } from '../../services/export-service';
import { LoggedInService } from './../../../shared/services/logged-in-service';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-export',
  imports: [MatRadioModule, MatSnackBarModule],
  templateUrl: './export.html',
  styleUrl: './export.scss',
})
export class Export implements AfterViewInit {
  private _changeDetectorRef = inject(ChangeDetectorRef);
  private _exportService = inject(ExportService);
  private _loggedInService = inject(LoggedInService);
  private _downloadService = inject(DownloadService);

  private _snackBar = inject(MatSnackBar);

  private _options: ExportOptionsResponseDto | undefined = undefined;
  public get loading(): boolean {
    return this._options === undefined;
  }
  public get hasData(): boolean {
    return !this.loading;
  }

  public get documentTypes(): IDocumentType[] {
    return this._documentTypes as IDocumentType[];
  }

  public get selectedDocumentType(): string {
    if (!this._selectedDocumentType) return 'undefined';

    return this._selectedDocumentType;
  }
  public set selectedDocumentType(documentType: string) {
    this._selectedDocumentType = documentType;

    this.setupDocumentTypeDescription();
    this.setupExportOptions();
  }

  public get selectedDocumentTypeDescription(): string {
    if (!this._selectedDocumentTypeDescription) return 'undefined';

    return this._selectedDocumentTypeDescription;
  }
  public set selectedDocumentTypeDescription(documentTypeDescription: string) {
    this._selectedDocumentTypeDescription = documentTypeDescription;
  }

  private _documentTypes: IDocumentType[] | undefined = undefined;
  private _selectedDocumentType: string | undefined = undefined;
  private _selectedDocumentTypeDescription: string | undefined = undefined;

  public get exportOptions(): IExportOption[] {
    return this._exportOptions as IExportOption[];
  }

  public get selectedExportOption(): string {
    if (!this._selectedExportOptionName) return 'undefined';

    return this._selectedExportOptionName;
  }
  public set selectedExportOption(exportOptionName: string) {
    this._selectedExportOptionName = exportOptionName;

    this.setupExportOptionDescription();
  }

  public get selectedExportOptionDescription(): string {
    if (!this._selectedExportOptionDescription) return 'undefined';

    return this._selectedExportOptionDescription;
  }
  public set selectedExportOptionDescription(exportOptionDescription: string) {
    this._selectedExportOptionDescription = exportOptionDescription;
  }

  private _exportOptions: IExportOption[] | undefined = undefined;
  private _selectedExportOptionName: string | undefined = undefined;
  private _selectedExportOptionDescription: string | undefined = undefined;

  ngAfterViewInit() {
    //setTimeout(() => {
    //  this.getExportOptions();
    //});
  }

  getExportOptions() {
    this._exportService.getExportOptions().subscribe((resp) => {
      console.log('Rxed resp:', JSON.stringify(resp));
      if (resp !== null && resp !== undefined && resp.documentTypes.length > 0) {
        // got the data ok
        this._options = resp;
        this.setupDocumentTypes();
      } else {
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

  //ngAfterViewInit() {
  //  setTimeout(() => {
  //    this.getOptions();
  //  });
  //}

  //ngOnInit() {
  //  this.getOptions();
  //}

  getOptions() {
    //this._exportService
    //  .getExportOptions()
    //  .subscribe(
    //    resp => {
    //      console.log('Rxed resp:', JSON.stringify(resp));
    //      if (resp !== null && resp !== undefined && resp.documentTypes.length > 0) {

    //        // got the data ok
    //        this._options = resp;
    //        this.setupDocumentTypes();
    //      }
    //      else {

    //        // an error occured
    //        this.openSnackBar('Get Export options failed: ', 'OK');
    //      }
    //    });
    this._changeDetectorRef.detectChanges();
  }

  setupDocumentTypes() {
    if (this._options && this._options.documentTypes.length > 0) {
      this._documentTypes = this._options.documentTypes;

      let selection: IDocumentType = this._options.documentTypes[0];

      this._selectedDocumentType = selection.name;

      this.setupDocumentTypeDescription();
      this.setupExportOptions();
    }
  }

  setupDocumentTypeDescription() {
    if (this._options && this._selectedDocumentType && this._options.documentTypes.length > 0) {
      for (let i: number = 0; i < this._options.documentTypes.length; i++) {
        let documentType: IDocumentType = this._options.documentTypes[i];
        if (this._selectedDocumentType === documentType.name) {
          this._selectedDocumentTypeDescription = documentType.description;
        }
      }
    }
  }

  setupExportOptions() {
    if (this._options && this._selectedDocumentType && this._options.exportOptions.length > 0) {
      this._exportOptions = this.getAvailableOptionsForDocumentType();

      if (this._exportOptions.length === 0) {
        return;
      }

      let selection: IExportOption = this._exportOptions[0];

      this._selectedExportOptionName = selection.name;
      this.setupExportOptionDescription();
    }
  }

  setupExportOptionDescription() {
    if (this._options && this._selectedExportOptionName && this._options.exportOptions.length > 0) {
      for (let i: number = 0; i < this._options.exportOptions.length; i++) {
        let exportOption: IExportOption = this._options.exportOptions[i];
        if (this._selectedExportOptionName === exportOption.name) {
          this._selectedExportOptionDescription = exportOption.description;
        }
      }
    }
  }

  private getAvailableOptionsForDocumentType() {
    if (this._options && this._selectedDocumentType && this._options.exportOptions.length > 0) {
      let availableOptions: IExportOption[] = [];

      for (let i: number = 0; i < this._options.exportOptions.length; i++) {
        let exportOption: IExportOption = this._options.exportOptions[i];

        for (let j: number = 0; j < exportOption.supportedDocumentTypes.length; j++) {
          if (exportOption.supportedDocumentTypes[j] === this._selectedDocumentType) {
            availableOptions.push(exportOption);
            break;
          }
        }
      }
      return availableOptions;
    }

    return [];
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  exportData() {
    if (this._selectedDocumentType && this._selectedExportOptionName) {
      console.log(
        'Getting report of type: ' +
          this._selectedDocumentType +
          ' with export option: ' +
          this._selectedExportOptionName +
          ' for user: ' +
          this._loggedInService.loggedInUserName,
      );

      this._downloadService.downloadDocument(
        this._loggedInService.loggedInUserName,
        this._selectedDocumentType,
        this._selectedExportOptionName,
      );
    }
  }
}
