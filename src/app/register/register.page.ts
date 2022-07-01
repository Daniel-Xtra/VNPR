/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  conpasswordType: string = 'password';
  conpasswordIcon: string = 'eye-off';

  constructor(private navCtrl: NavController) {}

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }
  hideConShowPassword() {
    this.conpasswordType =
      this.conpasswordType === 'text' ? 'password' : 'text';
    this.conpasswordIcon =
      this.conpasswordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  goToPage(page) {
    this.navCtrl.navigateRoot(page);
  }
}
