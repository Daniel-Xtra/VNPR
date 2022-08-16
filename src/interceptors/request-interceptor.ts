/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable curly */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/quotes */

import { BaseProvider } from './../providers/base/base';
import { StorageKey } from './../app/app.enums';
import { Helpers } from './../app/app.helpers';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { from } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { catchError, filter, mergeMap, switchMap, take } from 'rxjs/operators';
import { map } from 'rxjs-compat/operator/map';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  errorAlertShown: boolean;
  private refreshTokenInProgress = false;
  private refreshTokenSubject: BehaviorSubject<unknown> =
    new BehaviorSubject<unknown>(null);
  newToken: any;

  constructor(
    private _helpers: Helpers,
    private api: BaseProvider,
    private injector: Injector
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        if (err.error.isTrusted) {
          console.error('An error occurred:', err.error);
          this._helpers.dismissLoader();
          this._helpers.createAlert(
            'Please check your network settings and try again.',
            'You seem to be offline!'
          );
        } else {
          if (err.status === 401) {
            // remove Bearer token and redirect to login page
            if (this.refreshTokenInProgress) {
              this.refreshTokenSubject.asObservable().pipe(
                switchMap(() => {
                  return next.handle(this.addAuthenticationToken(req));
                })
              );
            } else {
              this.refreshTokenInProgress = true;

              // Set the refreshTokenSubject to null so that subsequent API calls will wait until the new token has been retrieved
              this.refreshTokenSubject.next(null);
              this.refreshTokens().pipe(
                switchMap(
                  (res: any) => {
                    this._helpers.store(StorageKey.accessToken, res.data.token);
                    this._helpers.store(
                      StorageKey.refreshToken,
                      res.data.refreshToken
                    );
                    this.newToken = res.data.token;
                    //When the call to refreshToken completes we reset the refreshTokenInProgress to false
                    // for the next time the token needs to be refreshed
                    this.refreshTokenInProgress = false;
                    this.refreshTokenSubject.next(res.data.token);
                    return next.handle(this.addAuthenticationToken(req));
                  },
                  catchError(() => this.logout())
                )
              );
            }
          } else if (err.error.message) {
            if (err.error.message == 'Request timed out') {
              this._helpers.dismissLoader();
              this._helpers.showErrorToast(err.error.message);
            }
            if (err.error.statusCode == 404) {
              this._helpers.dismissLoader();
              this._helpers.showErrorToast('Please update your user biodata');
            }
            if (req.method !== 'GET') {
              this._helpers.dismissLoader();
              this._helpers.showErrorToast(err.error.message);
            }
          }
        }

        return throwError(err.error);
      })
    );
  }

  refreshTokens() {
    return from(this._helpers.get(StorageKey.refreshToken)).pipe(
      mergeMap((refreshToken) => {
        if (refreshToken) {
          this.api.setActionUrl('/auth', '/refresh-token');
          return this.api.post({ refreshToken });
        }
        throwError('Session Expired');
      })
    );
  }

  addAuthenticationToken(req: HttpRequest<any>) {
    const headers = req.headers.set('Authorization', `Bearer ${this.newToken}`);
    return req.clone({ headers });
  }

  async logout() {
    this._helpers.clearDb();
  }
}
