import { Injectable } from '@angular/core';
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Watch } from '../models/Watch';

@Injectable({
  providedIn: 'root',
})
export class ServerHttpService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      // Authorization: 'my-auth-token',
      // Authorization: 'Basic ' + btoa('username:password'),
    }),
  };
  private REST_API_SERVER = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  public getWatches() {
    const url = `${this.REST_API_SERVER}/api/watch`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }
  public getWatch(Id) {
    const url = `${this.REST_API_SERVER}/api/watch/` + Id;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public addWatch(data: Watch) {
    const url = `${this.REST_API_SERVER}/api/watch`;
    return this.httpClient
      .post<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public modifyWatch(Id, data) {
    const url = `${this.REST_API_SERVER}/api/watch/` + Id;
    console.log(url);

    return this.httpClient
      .put<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public deleteWatch(Id) {
    const url = `${this.REST_API_SERVER}/api/watch/` + Id;
    return this.httpClient.delete<any>(url).pipe(catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
