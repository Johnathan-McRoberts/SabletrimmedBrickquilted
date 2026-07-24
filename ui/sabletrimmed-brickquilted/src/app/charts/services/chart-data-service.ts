import { HttpClient, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

import { environment } from '../../../environments/environment';

import { IBooksTotal } from '../models/books-total';


@Injectable({
  providedIn: 'root',
})
export class ChartDataService {
  private baseUrl: string = environment.baseUrl;

  private http = inject(HttpClient);

  public getBooksTotals(): Observable<IBooksTotal[]> {
    //set up the url
    const url = '/api/ChartData/totals';

    // return the observable
    return this.http.get<IBooksTotal[]>(this.baseUrl + url);
  }
}
