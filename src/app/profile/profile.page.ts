/* eslint-disable no-underscore-dangle */
import { Component } from '@angular/core';
import { Helpers } from '../app.helpers';
import {
  Camera,
  CameraOptions,
  CameraSource,
  CameraResultType,
  ImageOptions,
} from '@capacitor/camera';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  constructor(private _helpers: Helpers) {}

  openImageSourceOptions() {
    const options: ImageOptions = {
      quality: 60,
      allowEditing: true,
      resultType: CameraResultType.Uri,
    };

    this._helpers.createActionsheet({
      buttons: [
        {
          text: 'Camera',
          icon: 'camera',
          handler: () => {
            options.source = CameraSource.Camera;
            Camera.getPhoto(options)
              .then((imagePath) => {
                console.log(imagePath.path);
              })
              .catch((error) => {
                console.error('Error getting image: ', error);
              });
          },
        },
        {
          text: 'Gallery',
          icon: 'images',
          handler: () => {
            options.source = CameraSource.Photos;
            Camera.getPhoto(options)
              .then((imagePath) => {
                console.log(imagePath.path);
              })
              .catch((error) => {
                console.error('Error getting image: ', error);
              });
          },
        },
      ],
    });
  }
}
