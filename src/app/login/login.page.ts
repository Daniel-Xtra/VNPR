/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { StorageKey } from '../app.enums';
import { Helpers } from '../app.helpers';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../../models/user';
import { AuthProvider } from 'src/providers/auth/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginRes: any;
  loginCredentials = { username: '', password: '' };
  signinForm: FormGroup;
  showarning = false;
  loginfailed: boolean;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  window: Window;

  constructor(
    private navCtrl: NavController,
    private _helpers: Helpers,
    private formBuilder: FormBuilder,
    private _auth: AuthProvider
  ) {
    this.loginfailed = false;
    this.initializeForms();
    // this.getrelogin();
  }

  hideShowPassword() {
    this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
    this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
  }

  async getrelogin() {
    this.showarning = await this._helpers.get('relogin');
  }
  initializeForms() {
    this.signinForm = this.formBuilder.group({
      username: [
        null,
        [
          Validators.required,
          Validators.pattern(new RegExp(/^[a-zA-Z0-9._-]{3,16}$/i)),
        ],
      ],
      password: [null, [Validators.required]],
    });
  }

  login() {
    this._helpers.removeFromDB(StorageKey.user_obj);
    if (!this.loginCredentials) {
      this._helpers.dismissLoader();
      console.log('no values supplied');
      this._helpers.showToast('No values supplied...');
    } else {
      this._helpers.createLoader('Logging in...');

      this._auth.signin(this.loginCredentials).subscribe(
        (res) => {
          this.authSuccess(
            res.data.token,
            res.data.refreshToken,
            res.data.user
          );
          this._helpers.dismissLoader();
          // this.firebaseAnalytics.trackEvent('login', {});
        },
        (error) => {
          this._helpers.dismissLoader();
          console.log('error', error);
        }
      );
    }
  }

  authSuccess(accessToken: string, refreshToken: string, user: User) {
    const JWT = new JwtHelperService();

    const payload = JWT.decodeToken(accessToken);
    this._helpers.store(StorageKey.authPayload, payload.user);
    this._helpers.store(StorageKey.user, user);
    this._helpers.store(StorageKey.user_id, user.id);
    this._helpers.store(StorageKey.user_name, user.username);

    this._helpers.store(StorageKey.accessToken, accessToken);
    this._helpers.store(StorageKey.refreshToken, refreshToken);
    return this.goToPage();
  }
  goToPage() {
    this.navCtrl.navigateRoot('home');
  }

  goToTabPage(page) {
    this.navCtrl.navigateForward(page);
  }
}
