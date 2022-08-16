/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */

import { BaseProvider } from './../base/base';
import { Injectable } from '@angular/core';
import { Vehicle } from 'src/models/vehicle';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class VehicleProvider {
  private actionUrl = '/vehicles';
  constructor(private api: BaseProvider) {}

  addVehicle(data: Vehicle) {
    this.api.setActionUrl(this.actionUrl, '/create');
    return this.api.post(data);
  }

  getVehicle(plate_number: string) {
    this.api.setActionUrl(this.actionUrl, `/${plate_number}`);
    return this.api.get<Vehicle>();
  }

  delVehicle(plate_number: string) {
    this.api.setActionUrl(this.actionUrl, `/${plate_number}/delete`);
    return this.api.delete();
  }
}
