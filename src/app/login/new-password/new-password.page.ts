import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.page.html',
  styleUrls: ['./new-password.page.scss'],
})
export class NewPasswordPage {
  constructor(private navCtrl: NavController) {}

  goToPage(page) {
    this.navCtrl.navigateForward(page);
  }
}
