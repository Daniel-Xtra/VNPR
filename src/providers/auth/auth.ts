/* eslint-disable @typescript-eslint/quotes */
import { Signup, adminSignupModel, SignupModel } from './../../models/signup';
import { BaseProvider } from './../base/base';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {
  private actionUrl = '/auth';
  constructor(private api: BaseProvider) {}

  signup(data: SignupModel) {
    this.api.setActionUrl(this.actionUrl, '/signup');
    return this.api.post<Signup>(data);
  }

  adminSignup(data: adminSignupModel) {
    this.api.setActionUrl(this.actionUrl, '/admin-signup');
    return this.api.post<Signup>(data);
  }

  logout() {
    this.api.setActionUrl(this.actionUrl, '/logout');
    return this.api.post(null);
  }

  signin(data) {
    this.api.setActionUrl(this.actionUrl, '/signin');
    return this.api.post(data);
  }

  adminSignin(data) {
    this.api.setActionUrl(this.actionUrl, '/admin-signin');
    return this.api.post(data);
  }

  resetPassword(data: { code: string; password: string }) {
    this.api.setActionUrl(this.actionUrl, `/reset-password`);
    return this.api.post(data);
  }

  requestPasswordReset(email) {
    this.api.setActionUrl(this.actionUrl, `/request-reset/${email}`);
    return this.api.post(null);
  }

  verifyResetCode(code) {
    this.api.setActionUrl(this.actionUrl, `/verify-code?c=${code}`);
    return this.api.get();
  }
}
