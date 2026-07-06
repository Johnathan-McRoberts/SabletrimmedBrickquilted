import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { filter, first, map, merge, Observable, switchMap, takeUntil, tap } from 'rxjs';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ExportService } from './export-service';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  private _exportService = inject(ExportService);
  private _snackBar = inject(MatSnackBar);

  constructor() {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 3000 });
  }

  public downloadDocument(user: string, documentType: string, exportOption: string) {
    console.log('saying ....Your download will begin shortly...');

    this.openSnackBar('Your download will begin shortly...', 'OK');

    this._exportService.getExport(user, documentType, exportOption).subscribe((resp) => {
      console.log('Rxed resp:', resp.filename);
      this.saveResponse(resp);
      this.openSnackBar('Your report has been successfully downloaded', 'OK');

      //if (resp !== null && resp !== undefined && resp.length > 0) {

      //  // got the data ok
      //  this._books = resp;
      //  this.dataSource = new MatTableDataSource(this._books);
      //  this.dataSource.paginator = this.paginator;
      //  this.dataSource.sort = this.sort;
      //}
      //else {

      //  // an error occured
      //  this.openSnackBar('Get Books read failed: ', 'OK');
      //}
    });

    //this.reports$
    //  .pipe(
    //    first(),
    //    map((data) => {
    //      const report = data.reports.find((r) => r.id == reportId);
    //      return report
    //        ? {
    //          id: report.id,
    //          filename: `${report.displayPublicationName}.pdf`,
    //        }
    //        : null;
    //    }),
    //    tap((report) => {
    //      if (!report) {
    //        this.toastService.remove(startingToast);
    //        this.toastService.show(
    //          new Toast({
    //            headerIcon: mdiAlertCircleOutline,
    //            headerClass: 'text-danger fw-bold',
    //            header: 'Error',
    //            textOrTpl: 'Report not found',
    //            delay: 3000,
    //            autohide: true,
    //          }),
    //        );
    //      }
    //    }),
    //    filter((r) => r !== null),
    //    switchMap((report: any) => {
    //      let reportLoaders = formats
    //        .map((f) => this.getReportFile(report, f, subsectionIds))
    //        .filter((l) => l != null) as Observable<{
    //          filename: string;
    //          response: HttpResponse<Blob>;
    //        }>[];
    //      return merge(...reportLoaders);
    //    }),
    //    takeUntil(this.destroyed$),
    //  )
    //  .subscribe({
    //    next: (fileResponse: {
    //      response: HttpResponse<Blob>;
    //      filename: string;
    //    }) => {
    //      this.saveResponse(fileResponse);
    //      this.toastService.show(
    //        new Toast({
    //          headerIcon: mdiCheckCircle,
    //          headerClass: 'text-success fw-bold',
    //          header: 'Success',
    //          textOrTpl: 'Your report has been successfully downloaded',
    //          delay: 3000,
    //          autohide: true,
    //        }),
    //      );
    //    },
    //    error: () => {
    //      this.toastService.remove(startingToast);
    //      this.toastService.show(
    //        new Toast({
    //          headerIcon: mdiAlertCircleOutline,
    //          headerClass: 'text-danger fw-bold',
    //          header: 'Error',
    //          textOrTpl: 'There was an issue with your download',
    //          delay: 3000,
    //          autohide: true,
    //        }),
    //      );
    //    },
    //  });
  }

  getDocumentFile(
    userId: string,
    documentType: string,
    exportOption: string,
  ): Observable<{
    filename: string;
    response: HttpResponse<Blob>;
  }> | null {
    return this._exportService.getExport(userId, documentType, exportOption);
  }

  saveResponse(fileResponse: { response: HttpResponse<Blob>; filename: string }) {
    // check the data came back OK
    if (fileResponse.response.body) {
      // create the file content blob
      const blob: Blob = fileResponse.response.body as Blob;

      // set up an empty url for the blob
      const url = window.URL.createObjectURL(blob);

      // add the url element to the document
      this.downloadURL(url, fileResponse.filename);

      // invoke the download
      setTimeout(() => window.URL.revokeObjectURL(url), 1000);
    }
  }

  public downloadURL(data: any, fileName: string) {
    const element = document.createElement('a');
    element.href = data;
    element.download = fileName;
    document.body.appendChild(element);
    element.style.display = 'none';
    element.click();
    element.remove();
  }
}
