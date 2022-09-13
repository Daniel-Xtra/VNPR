/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */

import { BaseProvider } from './../base/base';
import { Injectable } from '@angular/core';

import { Report } from 'src/models/report';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReportProvider {
  private actionUrl = '/reports';
  constructor(private api: BaseProvider) {}

  addReport(plate_number, data: Report) {
    this.api.setActionUrl(this.actionUrl, `/report/${plate_number}`);
    return this.api.post(data);
  }

  allReport() {
    this.api.setActionUrl(this.actionUrl, '/all');
    return this.api.get();
  }

  resolveReport(unique_id) {
    this.api.setActionUrl(this.actionUrl, `/resolve/${unique_id}`);
    return this.api.update(unique_id);
  }
}
