/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { StorageKey } from 'src/app/app.enums';
import { Helpers } from 'src/app/app.helpers';
import { AuthProvider } from 'src/providers/auth/auth';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.page.html',
  styleUrls: ['./verify-code.page.scss'],
})
export class VerifyCodePage {
  signupForm: FormGroup;
  mail;
  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private _helpers: Helpers,
    private auth: AuthProvider
  ) {
    this.initializeForms();
    this.getMail();
  }

  initializeForms() {
    this.signupForm = this.formBuilder.group({
      code: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  verify() {
    this._helpers.createLoader('Please wait..');
    this.auth.verifyResetCode(this.signupForm.value.code).subscribe(
      (data) => {
        if (data.status) {
          this._helpers.dismissLoader();
          this._helpers.store(StorageKey.code, this.signupForm.value.code);
          this.goToPage('login/new-password');
        } else {
          this._helpers.dismissLoader();
          this._helpers.showErrorToast(
            'Code verification failed, please check your credentials'
          );
        }
      },
      (err) => {
        this._helpers.dismissLoader();
        this._helpers.showErrorToast(
          !err.message
            ? 'Could not verify code now. Please try again..'
            : err.message
        );
      }
    );
  }
  getMail() {
    const mails = this._helpers.get(StorageKey.verify_mail).then((res) => {
      this.mail = res;
    });
  }

  goToPage(page) {
    this.navCtrl.navigateForward(page);
  }
}
