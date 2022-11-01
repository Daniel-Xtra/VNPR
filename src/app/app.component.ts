/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';

import { SplashScreen } from '@capacitor/splash-screen';
import { NavController, Platform } from '@ionic/angular';
import { StorageKey } from './app.enums';
import { Helpers } from './app.helpers';
import { AuthProvider } from 'src/providers/auth/auth';
import { Router } from '@angular/router';
import { StatusBar, Style } from '@capacitor/status-bar';
import { User } from 'src/models/user';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user;
  users: User;
  admin;
  window: Window;
  rootPage: string;

  constructor(
    private navCtrl: NavController,
    private platform: Platform,
    private _helpers: Helpers,
    private auth: AuthProvider
  ) {
    this.platform.ready().then(() => {
      this.initializeApp();
      this.setRootPage();
    });
  }

  async ionViewWillEnter() {
    this.setRootPage();
  }

  async setRootPage() {
    let isLoggedIn = await this._helpers.get('user_id');

    console.log('isLoggedIn', isLoggedIn);

    if (isLoggedIn) {
      console.log('isLoggedIn', isLoggedIn);
      this.goToPage('/home');
    } else {
      this.goToPage('/login');
    }
    //else {
    //   console.log('just boarding');
    // }
  }

  // async getUserDetails() {
  //   this.user = await this._helpers.getUser();
  //   if (this.user.membership_type === 'admin') {
  //     console.log('adminstatus');
  //   } else if (this.user.membership_type === 'user') {
  //     console.log('userstatus');
  //   }
  // }

  initializeApp() {
    this.platform.ready().then(() => {
      setTimeout(() => {
        SplashScreen.hide().then(() => {
          StatusBar.setBackgroundColor({ color: '#711bd4' });
        });
      }, 2000);
    });
  }

  async logout() {
    this.auth.logout().subscribe(
      (res) => {
        console.log('Logout successful', res.data);
      },
      (error) => {
        console.error('Logout error', error);
      }
    );

    this._helpers.clearDb();
    this.goToPage('');
    console.log(this._helpers.get(StorageKey.user));
  }

  goToPage(page) {
    this.navCtrl.navigateRoot(page);
  }
}
