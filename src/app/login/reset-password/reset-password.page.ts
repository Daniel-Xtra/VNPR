/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { StorageKey } from 'src/app/app.enums';
import { Helpers } from 'src/app/app.helpers';
import { AuthProvider } from 'src/providers/auth/auth';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  signupForm: FormGroup;
  constructor(
    private navCtrl: NavController,
    private _helpers: Helpers,
    private auth: AuthProvider,
    private formBuilder: FormBuilder
  ) {
    this.initializeForms();
  }

  initializeForms() {
    this.signupForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  public forgotpass() {
    this._helpers.createLoader('please wait..');
    this.auth.requestPasswordReset(this.signupForm.value.email).subscribe(
      (data) => {
        this._helpers.dismissLoader();
        this._helpers.store(
          StorageKey.verify_mail,
          this.signupForm.value.email
        );
        console.log(data.message);
        this.goToPage();
      },
      () => {
        this._helpers.dismissLoader();
      }
    );
  }

  goToPage() {
    this.navCtrl.navigateForward('login/verify');
  }
}
