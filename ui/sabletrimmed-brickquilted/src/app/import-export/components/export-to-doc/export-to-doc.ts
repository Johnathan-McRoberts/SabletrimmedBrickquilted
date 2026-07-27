import { Component, inject, OnInit, ChangeDetectorRef, signal } from '@angular/core';

import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatButtonModule } from '@angular/material/button';

import { MatSnackBar } from '@angular/material/snack-bar';

import {
  ExportOptionsResponseDto,
  IDocumentType,
  IExportOption,
} from '../../models/export-options-response-dto';
import { ExportDisplayResponseDto } from '../../models/export-display-response-dto';

import { DownloadService } from '../../services/download-service';
import { ExportService } from '../../services/export-service';
import { LoggedInService } from './../../../shared/services/logged-in-service';

@Component({
  selector: 'app-export-to-doc',
  imports: [
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    MatRadioModule,
  ],
  templateUrl: './export-to-doc.html',
  styleUrl: './export-to-doc.scss',
})
export class ExportToDoc implements OnInit {
  private _exportService = inject(ExportService);
  private _loggedInService = inject(LoggedInService);
  private _downloadService = inject(DownloadService);
  private _snackBar = inject(MatSnackBar);
  private changeDetectorRef = inject(ChangeDetectorRef);

  private _documentTypes: IDocumentType[] | undefined = undefined;
  private _exportOptions: IExportOption[] | undefined = undefined;

  constructor() {
    this._documentTypes = [];
    this._exportOptions = [];
  }

  public get documentTypes(): IDocumentType[] {
    return this._documentTypes || [];
  }

  public get exportOptions(): IExportOption[] {
    return this._exportOptions || [];
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
    this._exportService.getExportOptions().subscribe((resp: ExportOptionsResponseDto) => {
      console.log('Rxed resp:', JSON.stringify(resp));
      if (resp !== null && resp !== undefined && resp.documentTypes.length > 0) {
        this._documentTypes = resp.documentTypes;
        this._exportOptions = resp.exportOptions;

        this.changeDetectorRef.detectChanges();
      } else {
        // an error occured
        this.openSnackBar('Get Export options failed: ', 'OK');
      }
    });
  }

  // selected export option

  selectedExportOpt = '';

  public onExportSelection() {
    console.log('now selected : ', this.selectedExportOpt);
    this._selectedExportOption = this.selectedExportOpt;

    const isDisabledVal = !this.hasExportOption || !this.hasDocumentTypeSelection;
    this.isDisabled.set(isDisabledVal);
    console.log('isDisabled: ', isDisabledVal);
  }

  public get hasExportOption(): boolean {
    return (
      this._exportOptions !== undefined &&
      this._exportOptions.length > 0 &&
      this._selectedExportOption !== undefined &&
      this.selectedExportOpt !== ''
    );
  }

  private _selectedExportOption: string | undefined = undefined;

  // selected document type

  selectedDocType = '';

  public onDocSelection() {
    console.log('now selected : ', this.selectedDocType);
    this._selectedDocumentType = this.selectedDocType;

    const isDisabledVal = !this.hasExportOption || !this.hasDocumentTypeSelection;
    this.isDisabled.set(isDisabledVal);
    console.log('isDisabled: ', isDisabledVal);
  }

  public get hasDocumentTypeSelection(): boolean {
    return (
      this._documentTypes !== undefined &&
      this._documentTypes.length > 0 &&
      this._selectedDocumentType !== undefined &&
      this.selectedDocType !== ''
    );
  }

  private _selectedDocumentType: string | undefined = undefined;
  public get selectedDocumentType(): string {
    if (!this._selectedDocumentType) return 'undefined';

    return this._selectedDocumentType;
  }
  public set selectedDocumentType(documentType: string) {
    this._selectedDocumentType = documentType;

    //this.setupDocumentTypeDescription();
    //this.setupExportOptions();
  }

  //  butons

  isDisabled = signal<boolean>(true);

  public get noOptionsSelection(): boolean {
    return !this.hasDocumentTypeSelection || !this.hasDocumentTypeSelection;
  }

  exportData() {
    if (this.hasDocumentTypeSelection && this.hasExportOption) {
      console.log(
        'Getting report of type: ' +
          this._selectedDocumentType +
          ' with export option: ' +
          this._selectedExportOption +
          ' for user: ' +
          this._loggedInService.loggedInUserName,
      );

      const user: string = this._loggedInService.loggedInUserName;
      const documentType: string = this._selectedDocumentType!;
      const exportOption: string = this._selectedExportOption!;

      this._downloadService.downloadDocument(user, documentType, exportOption);
    }
  }

  readonly $loadingDisplayData = signal(false);

  showExportData() {
    const user: string = this._loggedInService.loggedInUserName;
    const documentType: string = this._selectedDocumentType!;
    const exportOption: string = this._selectedExportOption!;

    this.$loadingDisplayData.set(true);
    this.displayText = 'Formatting....';

    this._exportService
      .getExportDisplay(user, documentType, exportOption)
      .subscribe((resp: ExportDisplayResponseDto) => {
        console.log('Rxed resp:', JSON.stringify(resp).substring(0, 100));

        if (resp !== null && resp !== undefined && resp.displayContent.length > 0) {
          // got the data ok
          this.displayText = resp.displayContent;

          this.exportDataToDisplay = true;
          this.$loadingDisplayData.set(false);
        } else {
          // an error occured
          this.openSnackBar('Get display export failed: ', 'OK');
        }
      });

    this.exportDataToDisplay = true;
  }

  public displayText = '';
  public exportDataToDisplay = false;
}
