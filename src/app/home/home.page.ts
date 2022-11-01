/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-underscore-dangle */
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { User, Profile } from 'src/models/user';
import { StorageKey } from '../app.enums';
import { Helpers } from '../app.helpers';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  image;
  firstname;
  lastname;
  membership;
  profile_image: string;
  user: User;
  constructor(private navCtrl: NavController, private _helpers: Helpers) {
    this.getProfile();
    this.getUserDetails();
  }

  // getImage() {
  //   this._helpers.get(StorageKey.user).then((res) => {
  //     this.firstname = res.first_name;
  //     this.lastname = res.last_name;
  //     this.membership = res.membership_type;
  //     this.image = res['profile'].profile_picture_url;
  //     console.log(res);
  //   });
  // }

  ionViewWillEnter() {
    this.getProfile();
  }

  async getProfile() {
    const user: User = await this._helpers.getUser();
    this.firstname = user.first_name;
    this.lastname = user.last_name;
    this.membership = user.membership_type;
    const profile: Profile = user.profile;
    this.profile_image = profile.profile_picture_url;

    // this._helpers.get(StorageKey.user_name).then((username) => {
    //   this.profile.getProfile(username).subscribe((res: any) => {
    //     this.details = res.data;
    //     console.log(res);
    //   });
    // });
  }

  goToPage(page) {
    this.navCtrl.navigateForward(page);
  }

  async getUserDetails() {
    this.user = await this._helpers.getUser();
  }
}
