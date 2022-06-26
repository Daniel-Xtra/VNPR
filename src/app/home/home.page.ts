import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  linkSlideOpts = {
    slidesPerView: 1.1,
    spaceBetween: 4,
    slidesOffsetBefore: 11,
    loop: true,
  };

  constructor(private navCtrl: NavController) {}

  goToPage(page) {
    this.navCtrl.navigateRoot(page);
  }
}
