/* eslint-disable @typescript-eslint/quotes */
import { Profile } from './../../models/user';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base';

@Injectable()
export class ProfileProvider {
  private actionUrl = '/profiles';
  constructor(private api: BaseProvider) {}

  getProfile(username: string) {
    this.api.setActionUrl(this.actionUrl, `/${username}`);
    return this.api.get();
  }

  updateProfile(input: Profile) {
    this.api.setActionUrl(this.actionUrl);
    return this.api.update(input);
  }

  postProfilePhoto(input: { photo: string }) {
    this.api.setActionUrl(this.actionUrl, '/upload');
    console.log('inputer=', { input });
    return this.api.post(input);
  }
}
