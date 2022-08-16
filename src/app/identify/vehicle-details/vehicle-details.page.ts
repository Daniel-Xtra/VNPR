/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { StorageKey } from 'src/app/app.enums';
import { Helpers } from 'src/app/app.helpers';
import { VehicleProvider } from 'src/providers/vehicle/vehicle';

@Component({
  selector: 'app-vehicle-details',
  templateUrl: './vehicle-details.page.html',
  styleUrls: ['./vehicle-details.page.scss'],
})
export class VehicleDetailsPage {
  details;
  plate;

  seeMore = true;

  constructor(
    private _helpers: Helpers,
    private vehicle: VehicleProvider,
    private alertCtrl: AlertController,
    private navCtrl: NavController
  ) {
    this.getData();
  }

  getData() {
    // this._helpers.createLoader('loading data...');
    this._helpers.get(StorageKey.car).then((res: any) => {
      this._helpers.dismissLoader();
      res.forEach((element) => {
        this.details = element;
      });
      console.log(res, this.details.plate_number);
    });
  }

  async del() {
    const alert = await this.alertCtrl.create({
      header: `Delete selected plate ${this.details.plate_number}?`,
      // message: 'Choose an option below',
      cssClass: 'alertCss',
      buttons: [
        {
          text: 'No',
          cssClass: 'btnCss',
          role: 'cancel',
          handler: () => {
            console.log('Plate number not deleted');
          },
        },
        {
          text: 'Yes',
          cssClass: 'btnCss',
          handler: () => {
            this.vehicle.delVehicle(this.details.plate_number).subscribe(() => {
              console.log('Plate number deleted');
              this.navCtrl.navigateBack('identify');
            });
          },
        },
      ],
    });
    await alert.present();
  }

  switch() {
    this.seeMore = !this.seeMore;
  }
}
