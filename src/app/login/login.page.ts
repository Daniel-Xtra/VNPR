/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Helpers } from '../app.helpers';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';

  constructor(private navCtrl: NavController, private _helper: Helpers) {}

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  goToPage(page) {
    this._helper.createLoader('Logging in');
    setTimeout(() => {
      this._helper.dismissLoader();
      this.navCtrl.navigateRoot(page);
    }, 2000);
  }

  goToTabPage(page) {
    this.navCtrl.navigateForward(page);
  }
}
