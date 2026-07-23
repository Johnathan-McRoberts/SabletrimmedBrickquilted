import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEditorDetails } from '../models/ieditor-details';
import { environment } from '../../../environments/environment';

import { IAddBookRequestDto } from '../models/add-book-request-dto';
import { IAddBookResponseDto } from '../models/add-book-response-dto';

@Injectable({
  providedIn: 'root',
})
export class BookEditorService {
  private baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  public getEditorDetails(): Observable<IEditorDetails> {
    //set up the url
    const url = '/api/BookEditor/editor-details';

    // return the observable
    return this.http.get<IEditorDetails>(this.baseUrl + url);
  }

  addBook(request: IAddBookRequestDto): Observable<IAddBookResponseDto> {
    //set up the url
    const url = '/api/BookEditor/add-book';

    // set up the options

    console.log('Calling http.post url :\n', url);

    // return the observable
    return this.http.post<IAddBookResponseDto>(this.baseUrl + url, request);
  }
}
