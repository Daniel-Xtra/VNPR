/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private navCtrl: NavController) {}

  ngOnInit(): void {
    this.initializeApp();
  }

  private initializeApp(): void {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }

  goToPage(page) {
    this.navCtrl.navigateRoot(page);
  }
}
