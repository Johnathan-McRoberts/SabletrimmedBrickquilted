import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment';

import { ExportOptionsResponseDto } from '../models/export-options-response-dto';

@Injectable({
  providedIn: 'root',
})
export class ExportService {
  private baseUrl: string = environment.baseUrl;

  private http = inject(HttpClient);

  constructor() {}

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
}
