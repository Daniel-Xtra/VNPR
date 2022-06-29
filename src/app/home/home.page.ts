/* eslint-disable @typescript-eslint/dot-notation */
/* eslint-disable no-underscore-dangle */
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
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
  constructor(private navCtrl: NavController, private _helpers: Helpers) {
    this.getImage();
  }

  getImage() {
    this._helpers.get(StorageKey.user).then((res) => {
      this.firstname = res.first_name;
      this.lastname = res.last_name;
      this.membership = res.membership_type;
      this.image = res['profile'].profile_picture_url;
      console.log(this.image);
    });
  }

  goToPage(page) {
    this.navCtrl.navigateForward(page);
  }
}
