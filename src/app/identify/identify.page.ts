import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-identify',
  templateUrl: './identify.page.html',
  styleUrls: ['./identify.page.scss'],
})
export class IdentifyPage {
  constructor(private navCtrl: NavController) {}

  move() {
    this.navCtrl.navigateForward('identify/vehicle-details');
  }
}
