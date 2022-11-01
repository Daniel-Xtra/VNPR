/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable quote-props */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
import { Component } from '@angular/core';
import { ProfileProvider } from 'src/providers/profile/profile';
import { StorageKey } from '../app.enums';
import { Helpers } from '../app.helpers';

import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { BASE_URL } from '../app.constants';
import { HttpClient } from '@angular/common/http';
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject,
} from '@awesome-cordova-plugins/file-transfer/ngx';
import { Profile, User } from 'src/models/user';
import { NavController, NavParams } from '@ionic/angular';
import { AuthProvider } from 'src/providers/auth/auth';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {
  details;
  userdetails;
  profile_image: string;
  constructor(
    private _helpers: Helpers,
    private profile: ProfileProvider,
    private http: HttpClient,
    private camera: Camera,
    private transfer: FileTransfer,
    private auth: AuthProvider,
    private navCtrl: NavController,
    private navParams: NavParams
  ) {
    this.getProfile();
  }

  async getProfile() {
    const user: User = await this._helpers.getUser();

    const profile: Profile = user.profile;
    this.profile_image = user.profile.profile_picture_url;

    // this._helpers.get(StorageKey.user_name).then((username) => {
    //   this.profile.getProfile(username).subscribe((res: any) => {
    //     this.details = res.data;
    //     console.log(res);
    //   });
    // });
  }

  came() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      targetHeight: 360,
      targetWidth: 360,
    };

    const actionSheet = this._helpers.createActionsheet({
      buttons: [
        {
          text: 'Camera',
          icon: 'camera-sharp',
          cssClass: 'camera',
          handler: () => {
            options.sourceType = this.camera.PictureSourceType.CAMERA;
            this.camera
              .getPicture(options)
              .then((res) => {
                console.log(res);
                return this.uploadProfileImage(res);
              })
              .catch((error) => {
                console.error('Error getting image: ', error);
              });
          },
        },
        {
          text: 'Gallery',
          icon: 'image-sharp',
          cssClass: 'gallery',
          handler: () => {
            options.sourceType = this.camera.PictureSourceType.PHOTOLIBRARY;
            this.camera
              .getPicture(options)
              .then((res) => {
                console.log(res);
                return this.uploadProfileImage(res);
              })
              .catch((error) => {
                console.error('Error getting image: ', error);
              });
          },
        },
      ],
    });
  }

  async uploadProfileImage(imageUrl: string) {
    try {
      this._helpers.createLoader('please wait');
      const token = await this._helpers.get(StorageKey.accessToken);
      const baseUrl = `${BASE_URL}/profiles/upload/`;
      const fileTransfer: FileTransferObject = this.transfer.create();
      const options: FileUploadOptions = {
        fileKey: 'photo',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const res = await fileTransfer.upload(imageUrl, baseUrl, options);
      const updatedProfile: Profile = JSON.parse(res.response).data;
      const user = await this._helpers.getUser();
      // const updateProfilePage = this.navParams.get('updateProfilePage');
      user.profile = updatedProfile;
      this.profile_image = updatedProfile.profile_picture_url;
      await this._helpers.store(StorageKey.user, user);
      // updateProfilePage();

      this._helpers.showToast('Profile image updated!');
      this._helpers.dismissLoader();
    } catch (error) {
      this._helpers.dismissLoader();
      this._helpers.showErrorToast('Failed to update profile image!');
      console.error(error);
    }
  }

  // public async addNewToGallery() {
  //   // Take a photo
  //   const capturedPhoto = await Camera.getPhoto({
  //     resultType: CameraResultType.Uri, // file-based data; provides best performance
  //     source: CameraSource.Camera, // automatically take a new photo with the camera
  //     quality: 100, // highest quality (0 to 100)
  //   });

  //   // Save the picture and add it to photo collection
  //   const savedImageFile = await this.savePicture(capturedPhoto);
  // }

  // openImageSourceOptions() {
  //   const options: ImageOptions = {
  //     quality: 60,
  //     allowEditing: true,
  //     resultType: CameraResultType.Uri,
  //   };

  //   this._helpers.createActionsheet({
  //     buttons: [
  //       {
  //         text: 'Camera',
  //         icon: 'camera',
  //         handler: () => {
  //           options.source = CameraSource.Camera;
  //           Camera.getPhoto(options)
  //             .then((imagePath) => {
  //               console.log(imagePath);
  //             })
  //             .catch((error) => {
  //               console.error('Error getting image: ', error);
  //             });
  //         },
  //       },
  //       {
  //         text: 'Gallery',
  //         icon: 'images',
  //         handler: () => {
  //           options.source = CameraSource.Photos;
  //           Camera.getPhoto(options)
  //             .then((imagePath) => {
  //               console.log(imagePath);
  //               this.upload(imagePath.webPath);
  //             })
  //             .catch((error) => {
  //               console.error('Error getting image: ', error);
  //             });
  //         },
  //       },
  //     ],
  //   });
  // }

  dataURItoBlob(dataURI) {
    var byteString = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    var blob = new Blob([ab], { type: mimeString });
    return blob;
  }

  // private async readAsBase64(photo: Photo) {
  //   // Fetch the photo, read as a blob, then convert to base64 format
  //   const response = await fetch(photo.webPath!);
  //   const blob = await response.blob();

  //   return (await this.convertBlobToBase64(blob)) as string;
  // }

  // private convertBlobToBase64 = (blob: Blob) =>
  //   new Promise((resolve, reject) => {
  //     const reader = new FileReader();
  //     reader.onerror = reject;
  //     reader.onload = () => {
  //       resolve(reader.result);
  //     };
  //     reader.readAsDataURL(blob);
  //   });

  async logout() {
    this.auth.logout().subscribe(
      (res) => {
        console.log('Logout successful', res.data);
        this._helpers.clearDb();
        this.goToPage('/login');
        console.log(this._helpers.get(StorageKey.user));
      },
      (error) => {
        console.error('Logout error', error);
      }
    );
  }

  goToPage(page) {
    this.navCtrl.navigateRoot(page);
  }
}
