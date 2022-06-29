/* eslint-disable eqeqeq */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Helpers } from '../app.helpers';
import { JwtHelperService } from '@auth0/angular-jwt';
import { adminSignupModel } from 'src/models/signup';
import { User } from 'src/models/user';
import { StorageKey } from '../app.enums';
import { AuthProvider } from 'src/providers/auth/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  error_msg: any;
  signupForm: FormGroup;
  passwordType: string = 'password';
  passwordIcon: string = 'eye-off';
  conpasswordType: string = 'password';
  conpasswordIcon: string = 'eye-off';

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private _helpers: Helpers,
    private auth: AuthProvider
  ) {
    this.initializeForms();
  }

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

  initializeForms() {
    this.signupForm = this.formBuilder.group({
      username: [
        null,
        [
          Validators.required,
          Validators.pattern(new RegExp(/^[a-zA-Z0-9._]{3,16}$/i)),
        ],
      ],
      email: [null, [Validators.required, Validators.email]],

      phone: [
        null,
        [Validators.required, Validators.pattern(new RegExp(/^[0-9]{3,16}$/))],
      ],
      password: [null, [Validators.required, Validators.minLength(6)]],
      first_name: [null, [Validators.required]],
      last_name: [null, [Validators.required]],
      gender: [null, [Validators.required]],
    });
  }

  userReg() {
    // let verified: any;
    this._helpers.createLoader('creating account..');
    if (this.signupForm.value) {
      if (this.signupForm.value.phone.substring(0, 1) == 0) {
        this.signupForm.value.phone = this.signupForm.value.phone.substr(
          1,
          this.signupForm.value.phone.length
        );
      }
      const reg_obj: adminSignupModel = {
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        phone_number: '0' + this.signupForm.value.phone,
        username: this.signupForm.value.username,
        gender: this.signupForm.value.gender,
        first_name: this.signupForm.value.first_name,
        last_name: this.signupForm.value.last_name,
      };

      this.auth.adminSignup(reg_obj).subscribe(
        (res) => {
          this._helpers.dismissLoader();

          this._helpers.showToast('Account Created');
          this.goToPage('login');
        },
        (err) => {
          this._helpers.dismissLoader();
        }
      );
    } else {
      this._helpers.dismissLoader();
      this._helpers.showToast('Please,fill all the fields required..');
    }
  }

  // authSuccess(accessToken: string, refreshToken: string, user: User) {
  //   const JWT = new JwtHelperService();
  //   console.log('user data', user);

  //   const payload = JWT.decodeToken(accessToken);
  //   this._helpers.store(StorageKey.authPayload, payload.user);
  //   this._helpers.store(StorageKey.user, user);
  //   this._helpers.store(StorageKey.user_id, user.id);
  //   this._helpers.store(StorageKey.user_name, user.username);

  //   this._helpers.store(StorageKey.accessToken, accessToken);
  //   this._helpers.store(StorageKey.refreshToken, refreshToken);
  //   // return this.goToTabs();
  // }

  goToPage(page) {
    this.navCtrl.navigateRoot(page);
  }
}
