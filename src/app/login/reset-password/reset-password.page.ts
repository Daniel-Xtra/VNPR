import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  constructor(private navCtrl: NavController) {}

  goToPage(page) {
    this.navCtrl.navigateForward(page);
  }
}
