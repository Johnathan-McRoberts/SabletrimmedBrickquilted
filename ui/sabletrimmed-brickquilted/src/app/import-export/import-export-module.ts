import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';

import { SharedModule } from './../shared/shared-module';

import { ImportExportOverview } from './components/import-export-overview/import-export-overview';
import { ExportToDoc } from './components/export-to-doc/export-to-doc';

import { DownloadService } from './services/download-service';
import { ExportService } from './services/export-service';

@NgModule({
  declarations: [ImportExportOverview],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatSnackBarModule,
    MatTabsModule,
    SharedModule,

    ExportToDoc,
  ],
  exports: [ImportExportOverview],
  providers: [DownloadService, ExportService],
})
export class ImportExportModule {}
