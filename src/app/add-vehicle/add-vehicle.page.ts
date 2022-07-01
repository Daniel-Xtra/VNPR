/* eslint-disable @typescript-eslint/naming-convention */
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
  States = [
    'Abia',
    'Adamawa',
    'Akwa Ibom',
    'Anambra',
    'Bauchi',
    'Bayelsa',
    'Benue',
    'Borno',
    'Cross River',
    'Delta',
    'Ebonyi',
    'Edo',
    'Ekiti',
    'Enugu',
    'Gombe',
    'Imo',
    'Jigawa',
    'Kaduna',
    'Kano',
    'Kastina',
    'Kebbi',
    'Kogi',
    'Kwara',
    'Lagos',
    'Nassarawa',
    'Niger',
    'Ogun',
    'Ondo',
    'Osun',
    'Oyo',
    'Plateau',
    'Rivers',
    'Sokoto',
    'Taraba',
    'Yobe',
    'Zamfara',
  ];
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
