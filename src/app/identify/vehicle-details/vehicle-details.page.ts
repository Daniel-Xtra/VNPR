/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

import {
  AlertController,
  NavController,
  Platform,
  ToastController,
} from '@ionic/angular';
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
  user: any;
  data: any;
  public qrCodeDownloadLink: SafeUrl = '';
  constructor(
    private _helpers: Helpers,
    private vehicle: VehicleProvider,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private platform: Platform
  ) {
    this.getData();
    this.getUserDetails();
  }

  getData() {
    // this._helpers.createLoader('loading data...');
    this._helpers.get(StorageKey.car).then((res: any) => {
      this._helpers.dismissLoader();
      res.forEach((element) => {
        this.details = element;
        this.data = [this.details.plate_number, this.details.status];
      });
    });
  }

  onChangeURL(url: SafeUrl) {
    this.qrCodeDownloadLink = url;
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

  async getUserDetails() {
    this.user = await this._helpers.getUser();
  }

  private async _readAsBase64(url: string): Promise<string> {
    const response = await fetch(url);
    const blob = await response.blob();
    return await this._convertBlobToBase64(blob);
  }
  private async _convertBlobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  }
}
