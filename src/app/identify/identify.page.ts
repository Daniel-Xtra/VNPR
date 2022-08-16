/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { VehicleProvider } from 'src/providers/vehicle/vehicle';
import { StorageKey } from '../app.enums';
import { Helpers } from '../app.helpers';

@Component({
  selector: 'app-identify',
  templateUrl: './identify.page.html',
  styleUrls: ['./identify.page.scss'],
})
export class IdentifyPage {
  vehForm: FormGroup;
  constructor(
    private _helpers: Helpers,
    private vehicle: VehicleProvider,
    private formBuilder: FormBuilder,
    private navCtrl: NavController
  ) {
    this.initialize();
  }

  initialize() {
    this.vehForm = this.formBuilder.group({
      plate_number: [null, [Validators.required]],
    });
  }

  getVehicle() {
    if (this.vehForm.value.plate_number) {
      // this._helpers.createLoader('searching...');
      this.vehicle
        .getVehicle(this.vehForm.value['plate_number'])
        .subscribe((res) => {
          if (res.data['length'] > 0) {
            this._helpers.dismissLoader();
            this._helpers.store(StorageKey.car, res.data);

            this.navCtrl.navigateForward('identify/vehicle-details');
          } else {
            this._helpers.dismissLoader();
            this._helpers.showErrorToast('No data Found');
          }
        }),
        (err) => {
          this._helpers.dismissLoader();
          console.log(err);
        };
    } else {
      this._helpers.showErrorToast('Field cannot be empty');
    }
  }
}
