/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/quotes */
import { User } from './../../models/user';
import { Injectable } from '@angular/core';
import { BaseProvider } from '../base/base';

@Injectable()
export class UserProvider {
  private actionUrl = '/users';
  constructor(private api: BaseProvider) {}

  getUserDetails(username: string) {
    this.api.setActionUrl(this.actionUrl, `/${username}`);
    return this.api.get<User>();
  }

  updateUserDetails(user: User) {
    this.api.setActionUrl(this.actionUrl);
    return this.api.update<User>(user);
  }

  updateUser(data: any) {
    this.api.setActionUrl(this.actionUrl, '/');
    return this.api.update(data);
  }

  getBioData() {
    this.api.setActionUrl(this.actionUrl, `/biodata`);
    return this.api.get();
  }

  updateUserBioData(userdata) {
    this.api.setActionUrl(this.actionUrl, `/update-bio`);
    return this.api.update(userdata);
  }
}
