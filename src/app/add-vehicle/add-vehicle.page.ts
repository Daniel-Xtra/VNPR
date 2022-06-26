/* eslint-disable @typescript-eslint/type-annotation-spacing */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable eqeqeq */

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.page.html',
  styleUrls: ['./add-vehicle.page.scss'],
})
export class AddVehiclePage {
  first: boolean = false;
  second: boolean = false;
  third: boolean = false;

  constructor() {}

  toggle() {
    this.first = !this.first;
    this.second = false;
    this.third = false;
  }

  viewing() {
    this.second = !this.second;
    this.first = false;
    this.third = false;
  }

  showing() {
    this.third = !this.third;
    this.first = false;
    this.second = false;
  }
}
