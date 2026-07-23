import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment';

import { ExportOptionsResponseDto } from '../models/export-options-response-dto';
import { ExportDisplayResponseDto } from '../models/export-display-response-dto';


@Injectable({
  providedIn: 'root',
})
export class ExportService {
  private baseUrl: string = environment.baseUrl;

  private http = inject(HttpClient);

  public getExportOptions(): Observable<ExportOptionsResponseDto> {
    //set up the url
    const url = '/api/Export/options';

    // return the observable
    return this.http.get<ExportOptionsResponseDto>(this.baseUrl + url);
  }

  public getExport(user: string, documentType: string, exportOption: string) {
    const url: string = this.baseUrl + `/api/Export/export`;

    return this.http
      .post<Blob>(
        url,
        {
          UserId: user,
          DocumentType: documentType,
          Options: [exportOption],
        },
        { observe: 'response', responseType: 'blob' as 'json' },
      )
      .pipe(
        map((response: HttpResponse<Blob>) => {
          const filename: string =
            this.getFileName(response.headers.get('Content-Disposition')) ??
            `report.${documentType.toLowerCase()}`;
          return { filename, response };
        }),
      );
  }

  public getFileName(contentDisposition: string | null): string | null {
    if (!contentDisposition) {
      return null;
    }

    const fileName = contentDisposition
      .split(';')
      .find((n: string) => n.includes("filename*=UTF-8''"))
      ?.replace(/filename\*=UTF-8''|"/g, '')
      .trim();

    return fileName ? decodeURIComponent(fileName) : null;
  }

  public getExportDisplay(
    user: string,
    documentType: string,
    exportOption: string)
    : Observable<ExportDisplayResponseDto> {
    // set up the options
    const url: string = this.baseUrl + `/api/Export/export-display`;


    // and the query parameters
    const queryParams: string =
      '?UserId=' + user + '&DocumentType=' + documentType + '&Options=' + exportOption;

    // log the data  
    console.log('Calling http.get url :\n', url);
    console.log('with options url :\n', queryParams);

    // return the observable
    return this.http.get<ExportDisplayResponseDto>(url + queryParams);
  }
}
