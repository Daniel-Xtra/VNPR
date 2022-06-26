import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-verify-code',
  templateUrl: './verify-code.page.html',
  styleUrls: ['./verify-code.page.scss'],
})
export class VerifyCodePage {
  constructor(private navCtrl: NavController) {}

  goToPage(page) {
    this.navCtrl.navigateForward(page);
  }
}
