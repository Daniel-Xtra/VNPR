/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { StorageKey } from 'src/app/app.enums';
import { Helpers } from 'src/app/app.helpers';
import { AuthProvider } from 'src/providers/auth/auth';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.page.html',
  styleUrls: ['./new-password.page.scss'],
})
export class NewPasswordPage {
  signupForm: FormGroup;
  code;
  constructor(
    private navCtrl: NavController,
    private _helpers: Helpers,
    private auth: AuthProvider,
    private formBuilder: FormBuilder
  ) {
    this.initializeForm();
    this.getCode();
  }
  initializeForm() {
    this.signupForm = this.formBuilder.group({
      password: [null, [Validators.required, Validators.minLength(6)]],

      con_password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  public changepassword() {
    if (this.signupForm.value.password == this.signupForm.value.con_password) {
      this._helpers.createLoader('please wait');
      this.auth
        .resetPassword({
          code: this.code,
          password: this.signupForm.value.password,
        })
        .subscribe(
          (data) => {
            this._helpers.dismissLoader();
            this._helpers.clearDb();
            this._helpers.showToast(
              'Password Reset Successful,please login with your new password'
            );
            this.goToPage();
          },
          (err) => {
            this._helpers.dismissLoader();
          }
        );
    } else {
      this._helpers.dismissLoader();
      this._helpers.showErrorToast(
        'Password Mismatched, please Re-enter your password.'
      );
    }
  }
  getCode() {
    const coded = this._helpers.get(StorageKey.code).then((res) => {
      this.code = res;
    });
  }
  goToPage() {
    this.navCtrl.navigateRoot('login');
  }
}
