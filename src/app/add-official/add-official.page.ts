/* eslint-disable eqeqeq */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SignupModel } from 'src/models/signup';
import { AuthProvider } from 'src/providers/auth/auth';
import { Helpers } from '../app.helpers';

@Component({
  selector: 'app-add-official',
  templateUrl: './add-official.page.html',
  styleUrls: ['./add-official.page.scss'],
})
export class AddOfficialPage {
  signupForm: FormGroup;

  constructor(
    private _helpers: Helpers,
    private formBuilder: FormBuilder,
    private auth: AuthProvider
  ) {
    this.initializeForms();
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
      const reg_obj: SignupModel = {
        email: this.signupForm.value.email,
        phone_number: '0' + this.signupForm.value.phone,
        username: this.signupForm.value.username,
        gender: this.signupForm.value.gender,
        first_name: this.signupForm.value.first_name,
        last_name: this.signupForm.value.last_name,
      };

      this.auth.signup(reg_obj).subscribe(
        async (res) => {
          await this._helpers.dismissLoader();
          this.signupForm.reset();
          this._helpers.showToast('Account created!');
        },
        (err) => {
          this._helpers.dismissLoader();
          // this._helpers.showErrorToast(
          //   !err.message
          //     ? 'Could not register now. Please try again..'
          //     : err.message
          // );
          // console.log(err);
        }
      );
    } else {
      this._helpers.dismissLoader();
      this._helpers.showToast('Please,fill all the fields required..');
    }
  }
}
