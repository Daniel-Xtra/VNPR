/* eslint-disable no-underscore-dangle */
import { BASE_URL } from './../../app/app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { timeoutWith } from 'rxjs/operators';
import { ApiResponse } from '../../models/api-response';

@Injectable()
export class BaseProvider {
  private baseUrl: string;
  private _actionUrl: string;
  private timeOut: number;

  constructor(public http: HttpClient) {
    this.baseUrl = BASE_URL;
    this.timeOut = 60000;
  }

  public get<T = any>() {
    return this.http
      .get<ApiResponse<T>>(`${this.baseUrl}${this._actionUrl}`)
      .pipe(timeoutWith(this.timeOut, this.handleTimeout()));
  }

  public post<T = any>(input: any): Observable<ApiResponse<T>> {
    return this.http
      .post<ApiResponse<T>>(`${this.baseUrl}${this._actionUrl}`, input)
      .pipe(timeoutWith(this.timeOut, this.handleTimeout()));
  }

  public update<T = any>(input: any): Observable<ApiResponse<T>> {
    return this.http
      .put<ApiResponse<T>>(`${this.baseUrl}${this._actionUrl}`, input)
      .pipe(timeoutWith(this.timeOut, this.handleTimeout()));
  }

  public delete<T = any>(): Observable<ApiResponse<T>> {
    return this.http
      .delete<ApiResponse<T>>(`${this.baseUrl}${this._actionUrl}`)
      .pipe(timeoutWith(this.timeOut, this.handleTimeout()));
  }

  public setActionUrl(actionUrl: string, path: string = '') {
    this._actionUrl = `${actionUrl}${path}`;
  }

  private handleTimeout(): Observable<ApiResponse<null>> {
    return new Observable((obs) =>
      obs.error({ error: { message: 'Request timed out' } })
    );
  }
}
